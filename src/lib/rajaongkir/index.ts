import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RajaOngkirModule } from './rajaongkir.module';

@Global()
@Module({
  imports: [
    RajaOngkirModule.forRootAsync(RajaOngkirModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('RAJAONGKIR_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RajaOngkirModule],
})
export class NestRajaOngkirModule {}
