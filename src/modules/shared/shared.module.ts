import { Module } from '@nestjs/common';
import { NestMidtransModule } from '../../lib/midtrans';
import { NestRajaOngkirModule } from '../../lib/rajaongkir';

@Module({
  imports: [NestRajaOngkirModule, NestMidtransModule],
})
export class SharedModule {}
