import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MidtransModule } from './midtrans.module';

@Global()
@Module({
  imports: [
    MidtransModule.forRootAsync(MidtransModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        merchantId: configService.get<string>('midtrans.merchantId'),
        isProduction: configService.get<boolean>('midtrans.isProduction'),
        productionClientKey: configService.get<string>(
          'midtrans.productionClientKey',
        ),
        productionServerKey: configService.get<string>(
          'midtrans.productionServerKey',
        ),
        sandboxClientKey: configService.get<string>(
          'midtrans.sandboxClientKey',
        ),
        sandboxServerKey: configService.get<string>(
          'midtrans.sandboxServerKey',
        ),
        sandboxUrl: configService.get<string>('midtrans.sandboxUrl'),
        productionUrl: configService.get<string>('midtrans.productionUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MidtransModule],
})
export class NestMidtransModule {}
