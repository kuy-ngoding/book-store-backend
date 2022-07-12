import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUri: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME,
}));
