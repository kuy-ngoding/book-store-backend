import { registerAs } from '@nestjs/config';

export const nodemailer = registerAs('nodeMailer', () => ({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_SERVICE_PORT,
  secure: process.env.NODEMAILER_EMAIL_SECURE,
  emailUser: process.env.NODEMAILER_USER_EMAIL,
  emailPassword: process.env.NODEMAILER_EMAIL_PASSWORD,
  emailFrom: process.env.NODEMAILER_EMAIL_FROM,
}));
