import { registerAs } from '@nestjs/config';

export const rajaongkir = registerAs('rajaongkir', () => ({
  apiKey: process.env.RAJAONGKIR_API_KEY,
}));
