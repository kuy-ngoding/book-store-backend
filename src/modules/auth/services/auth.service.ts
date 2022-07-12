import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { FilterQuery } from 'mongoose';
import { formatPhoneNumber } from '../../../core/utils/formatPhoneNumber';
import {
  comparePassword,
  hashPassword,
} from '../../../core/utils/passwordHash';
import { User, UserDocument } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { RegisterRequest } from '../dtos/requests/register.request';
import { ResetPasswordRequest } from '../dtos/requests/reset-password.request';
import { LoginResponse } from '../dtos/response/login-response';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  /**
   *
   * @param {UserRepository} userRepository - user repository
   * @param {JwtService} jwtService - jwt service
   */
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register a new user
   * @param {RegisterDto} registerDto - register data
   * @returns
   */
  async register(request: RegisterRequest): Promise<User> {
    const { username, fullName, email, password, phoneNumber } = request;

    let filter: FilterQuery<UserDocument> = {};

    if (!username) {
      filter = { email };
    } else {
      filter = {
        $or: [{ email }, { username }],
      };
    }

    // find if user is already exists
    const checkExists = await this.userRepository.findOne(filter);

    // throw bad request if user already exists
    if (checkExists) {
      throw new BadRequestException('Username / Email already exitst');
    }
    // hashed password
    const hashedPassword = await hashPassword(password);

    // parse phone number from 085xxxx to +628xxxx
    const formmattedPhoneNumber = phoneNumber
      ? formatPhoneNumber(phoneNumber).substring(1)
      : undefined;

    // replace whitespace and if username not exists split from email
    const usernameValidator = username
      ? username.replace(' ', '').toLowerCase()
      : email.split('@')[0];

    const newUser: User = {
      username: usernameValidator,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber: formmattedPhoneNumber,
    };

    const createUser = await this.userRepository.create(newUser);
    if (!createUser) {
      throw new InternalServerErrorException('Failed to Create User');
    }

    return createUser;
  }

  async validateUser(username: string, pass: string): Promise<User> {
    // check if email / username already exists
    const checkExists = await this.userRepository.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!checkExists) {
      throw new NotFoundException('User not found');
    }

    const comparedPassword = await comparePassword(pass, checkExists.password);

    if (!comparedPassword) {
      throw new UnauthorizedException('Password not match');
    }

    if (comparedPassword) {
      await this.userRepository.updateLastLogin(checkExists._id);
    }

    return checkExists;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = {
      username: user.username,
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async getProfileByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  // reset password
  async resetPassword(resetPasswordDto: ResetPasswordRequest) {
    const hashedPassword = await hashPassword(resetPasswordDto.password);
    return await this.userRepository.resetPassword(
      resetPasswordDto.email,
      hashedPassword,
    );
  }

  // async requestForgotPasswordEmail(email: string) {
  //   let filter: FilterQuery<UserDocument> = {};
  //   filter = { email };
  //   // check if user exist
  //   const checkExists = await this.userRepository.findOne(filter);
  //   if (!checkExists) {
  //     throw new BadRequestException("Username / Email didn't exitst");
  //   }
  //   const token = await this.forgotPasswordJwtToken(checkExists);
  //   await this.emailService.sendPasswordResetEmail(checkExists, token);
  //   const resetPasswordLink =
  //     this.configService.get<string>('forgotPasswordUrl');
  //   return {
  //     email: checkExists.email,
  //     url: `${resetPasswordLink}/${token}`,
  //   };
  // }

  async decodeResetPasswordToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
  }

  async forgotPasswordJwtToken(user: User): Promise<string> {
    const payload = {
      flip: user._id,
      flop: (await hash(user.password, 12)).substring(0, 10),
    };

    const token = this.jwtService.sign(payload, {
      // expiresIn: '1m',
      expiresIn: '15m',
      // expiresIn: 900,
      // expiresIn: 3600,
    });
    return token;
  }
}
