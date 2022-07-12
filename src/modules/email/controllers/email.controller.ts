import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from '../../../core/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ICurrentUser } from '../../user/interfaces/current-user.interface';
import { SendEmailDto } from '../payloads/dto/send-email.dto';
import { EmailService } from '../services/email.service';

@Controller('mailer')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  //testing
  @Post('/send-mail')
  async mailerSend(
    @Body() sendMailDto: SendEmailDto,
    // @Res() res: Response,
  ) {
    // console.log('aa');
    return this.emailService.mailerSend(sendMailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send-email-verification')
  async mailerSendEmailVerification(
    @CurrentUser() user: ICurrentUser,
    @Body() sendMailDto: SendEmailDto,
  ) {
    console.log(user);
    return this.emailService.sendEmailVerification(user.username, user.email);
  }
}
