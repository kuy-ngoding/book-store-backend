import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BaseResponse } from '../../../core/dto/base-response';
import { baseResponseHelper } from '../../../core/helpers/base-response-helper';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { I2FALoginRequest } from '../interfaces/two-factor-login-request.interface';
import { SetNewPasswordRequest } from '../dtos/requests/set-new-password.request';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../dtos/response/login-response';
import { RegisterRequest } from '../dtos/requests/register.request';
import { EmailService } from '../../email/services/email.service';
import { SendEmailDto } from '../../email/payloads/dto/send-email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  /**
   * @description This method is used login and get jwt token
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: I2FALoginRequest,
  ): Promise<BaseResponse<LoginResponse>> {
    // console.log('masuk');

    // login with 2FA
    // let submitLogin = new LoginResponse();
    // if (req.user.is2FAEnabled) {
    //   submitLogin.accessToken = null;
    //   submitLogin.user = {
    //     _id: req.user._id,
    //     email: req.user.email,
    //     username: req.user.username,
    //     otpAuthUrl: await toDataURL(req.user.otpAuthUrl),
    //   };
    // } else {
    //   submitLogin = await this.authService.login(req.user);
    //   await this.userService.updateLastLogin(req.user._id);
    // }
    // const response = new BaseResponse<LoginResponse>();
    // response.data = submitLogin;

    // return response;

    const submitLogin = await this.authService.login(req.user);
    await this.userService.updateLastLogin(req.user._id);

    const response = new BaseResponse<LoginResponse>();
    response.data = submitLogin;

    return response;
  }

  /**
   * @description This method is used to register and get jwt token
   * @param registerDto
   * @returns
   * @memberof AuthController
   * @author Antonius Joshua
   */
  @Post('register')
  async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<BaseResponse<User>> {
    const createdUser = await this.authService.register(registerRequest);

    if (createdUser) {
      // const payload: SendEmailDto = {
      //   user: createdUser,
      //   reciver: createdUser.email,
      // };
      const sendEmail = await this.emailService.sendEmailVerification(
        createdUser.username,
        createdUser.email,
      );
      console.log(sendEmail);
    }

    const response = new BaseResponse<User>();
    response.data = createdUser;
    return response;
  }

  // @Post('/request-password-reset')
  // async requestPasswordReset(
  //   @Body() ForgotPasswordRequest: ForgotPasswordRequest,
  //   @Res() res: Response,
  // ): Promise<Response<BaseResponse<any>>> {
  //   const forgotPasswordResponse =
  //     await this.authService.requestForgotPasswordEmail(
  //       ForgotPasswordRequest.email,
  //     );
  //   const responseMessage = `Reset password link has been sent to ${forgotPasswordResponse.email}, url: ${forgotPasswordResponse.url}`;
  //   const response = baseResponseHelper(res, responseMessage, HttpStatus.OK);
  //   return response;
  // }

  @Get('/decode-user-token/:token')
  async decodeResetPasswordToken(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<any>>> {
    const decoded = await this.authService.decodeResetPasswordToken(token);
    return baseResponseHelper(res, decoded, HttpStatus.OK);
  }

  @Put('set-new-password')
  async forgotPassword(
    @Body() setNewPasswordRequest: SetNewPasswordRequest,
    @Res() res: Response,
  ): Promise<Response<BaseResponse<string>>> {
    const resetUserResponse = await this.userService.setNewPassword(
      setNewPasswordRequest,
    );
    const responseMessage = `User ${resetUserResponse.username} has successfully changed password`;
    const response = baseResponseHelper(res, responseMessage, HttpStatus.OK);
    return response;
  }
}
