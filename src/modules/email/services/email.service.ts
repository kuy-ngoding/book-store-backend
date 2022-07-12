import { Injectable, Logger } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { SendEmailDto } from '../payloads/dto/send-email.dto';
import { User } from '../../user/entities/user.entity';
import { VerifyProfileDto } from '../../user/dtos/requests/verify-profile.request';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(EmailService.name);

  async mailerSend(sendMailDto: SendEmailDto): Promise<SentMessageInfo> {
    console.log(sendMailDto);
    try {
      const { reciver, subject, message, template, context } = sendMailDto;
      const options: ISendMailOptions = {};
      options.to = reciver;
      options.subject = subject;
      if (template && message) {
        options.template = template;
        if (context) {
          options.context === context;
          options.context = { ...options.context, ['message']: message };
        } else {
          options.context = { ['message']: message };
        }
      } else if (!template && message) {
        options.html = message;
      }
      // template: '/email_verification_template.hbs';
      console.log(options);

      const sendEmailResponse = await this.mailerService.sendMail(options);
      console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async sendEmailVerification(
    username: string,
    email: string,
  ): Promise<SentMessageInfo> {
    try {
      const options: ISendMailOptions = {};
      this.logger.debug(`sending email verification to ${email}`);
      options.to = email;
      options.subject = 'Email Verification';
      options.template = 'email_verification_template';
      options.context = {
        username: username,
        email: email,
      };
      // console.log(options);
      const sendEmailResponse: SentMessageInfo =
        await this.mailerService.sendMail(options);
      this.logger.debug(`send email verification to ${email} response`);
      // console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async sendCompanyApprovedEmail(
    username: string,
    email: string,
  ): Promise<SentMessageInfo> {
    try {
      const options: ISendMailOptions = {};
      this.logger.debug(`sending email verification to ${email}`);
      options.to = email;
      options.subject = 'Email Verification';
      options.template = 'email_verification_template';
      options.context = {
        username: username,
        email: email,
      };
      // console.log(options);
      const sendEmailResponse: SentMessageInfo =
        await this.mailerService.sendMail(options);
      this.logger.debug(`send email verification to ${email} response`);
      // console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }

  // async sendEmailVerification(username: string, email: string) {
  //   try {
  //     const options: ISendMailOptions = {};
  //     this.logger.debug(`sending email verification to ${email}`);
  //     options.to = email;
  //     options.subject = 'Email Verification';
  //     options.template = '/email_verification_template';
  //     options.context = {
  //       username: username,
  //       email: email,
  //     };
  //     console.log(options);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async sendVerifyProfileSuccess(
    verifyProfileRequest: VerifyProfileDto,
  ): Promise<SentMessageInfo> {
    try {
      const options: ISendMailOptions = {};
      this.logger.debug(
        `sending verify profile success email to ${verifyProfileRequest.user.email}`,
      );
      options.to = verifyProfileRequest.user.email;
      options.subject = 'Profile Verified';
      options.template = '/profile_verified_template';
      options.context = {
        username: verifyProfileRequest.user.username,
      };
      const sendEmailResponse: SentMessageInfo =
        await this.mailerService.sendMail(options);
      this.logger.debug(
        `send verify profile success notification to ${verifyProfileRequest.user.email} response`,
      );
      console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerifyProfileFailed(
    verifyProfileRequest: VerifyProfileDto,
  ): Promise<SentMessageInfo> {
    try {
      const options: ISendMailOptions = {};
      this.logger.debug(
        `sending verify profile failed email to ${verifyProfileRequest.user.email}`,
      );
      options.to = verifyProfileRequest.user.email;
      options.subject = 'Profile Verification Failed';
      options.template = '/profile_verify_rejected_template';
      options.context = {
        username: verifyProfileRequest.user.username,
        reason: verifyProfileRequest.reason,
        description: verifyProfileRequest.description,
      };
      const sendEmailResponse: SentMessageInfo =
        await this.mailerService.sendMail(options);
      this.logger.debug(
        `send verify profile failed notification to ${verifyProfileRequest.user.email} response`,
      );
      console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async sendPasswordResetEmail(
    user: User,
    token: string,
  ): Promise<SentMessageInfo> {
    // console.log(sendMailDto);
    try {
      const options: ISendMailOptions = {};
      this.logger.debug(`sending reset password email to ${user.email}`);
      options.to = user.email;
      options.subject = 'Password';
      options.template = '/reset_password_template';
      options.context = {
        username: user.username,
        email: user.email,
        token: token,
        resetUrl: `https://backoffice.benefits.co.id/reset-password/${token}`,
      };
      const sendEmailResponse: SentMessageInfo =
        await this.mailerService.sendMail(options);
      this.logger.debug(`sending password reset email ${user.email} response`);
      console.log(sendEmailResponse);
      return sendEmailResponse;
    } catch (error) {
      console.log(error);
    }
  }
}
