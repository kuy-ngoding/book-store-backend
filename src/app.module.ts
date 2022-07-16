import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CompanyModule } from './modules/company/company.module';

import { EmailModule } from './modules/email/email.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { app } from './core/configs/app.config';
import { rajaongkir } from './core/configs/rajaongkir.config';
import { OrderModule } from './modules/order/order.module';
import { midtrans } from './core/configs/midtrans.config';
import { MidtransModule } from './lib/midtrans/midtrans.module';
import { nodemailer } from './core/configs/node-mailer.config';
import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [app, rajaongkir, midtrans, nodemailer],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('app.databaseUri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get<string>('nodeMailer.host'),
    //       port: configService.get<number>('nodeMailer.port'),
    //       // secure: configService.get<boolean>('nodeMailer.secure'),
    //       // secure: configService.get<boolean>('nodeMailer.secure'),
    //       secure: false,
    //       auth: {
    //         user: configService.get<string>('nodeMailer.emailUser'),
    //         pass: configService.get<string>('nodeMailer.emailPassword'),
    //       },
    //     },
    //     defaults: {
    //       from: configService.get<string>('nodeMailer.emailFrom'),
    //     },
    //     template: {
    //       dir: path.resolve(__dirname, './templates'),
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),

    AuthModule,
    ProfileModule,
    CompanyModule,
    EmailModule,
    OrderModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
