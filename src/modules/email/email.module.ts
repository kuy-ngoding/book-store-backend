import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { EmailController } from './controllers/email.controller';
import { EmailService } from './services/email.service';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('nodeMailer.host'),
          port: configService.get<number>('nodeMailer.port'),
          // secure: configService.get<boolean>('nodeMailer.secure'),
          // secure: configService.get<boolean>('nodeMailer.secure'),
          secure: false,
          auth: {
            user: configService.get<string>('nodeMailer.emailUser'),
            pass: configService.get<string>('nodeMailer.emailPassword'),
          },
        },
        defaults: {
          from: configService.get<string>('nodeMailer.emailFrom'),
        },
        template: {
          // dir: path.resolve(__dirname, './templates'),
          dir: path.join(__dirname, './../../templates'),
          // dir: './templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
