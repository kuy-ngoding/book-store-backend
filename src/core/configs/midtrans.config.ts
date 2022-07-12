import { registerAs } from '@nestjs/config';

export const midtrans = registerAs('midtrans', () => ({
  merchantId: process.env.MIDTRANS_MERCHANT_ID,
  isProduction: process.env.MIDTRANS_IS_PRODUCTION,
  productionClientKey: process.env.MIDTRANS_PRODUCTION_CLIENT_KEY,
  productionServerKey: process.env.MIDTRANS_PRODUCTION_SERVER_KEY,
  sandboxClientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
  sandboxServerKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
  sandboxUrl: process.env.MIDTRANS_SANDBOX_URL,
  productionUrl: process.env.MIDTRANS_PRODUCTION_URL,
}));
