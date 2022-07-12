import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MidtransService } from './domains/services/midtrans.service';
import { MidtransRepository } from './infrastructure/repositories/midtrans.repository';
import { MIDTRANS_MODULE_OPTIONS } from './midtrans.constant';
import { MidtransModuleOptions } from './midtrans.options';

@Global()
@Module({
  imports: [HttpModule],
  providers: [MidtransService, MidtransRepository],
  exports: [MidtransService],
})
export class MidtransModule extends createConfigurableDynamicRootModule<
  MidtransModule,
  MidtransModuleOptions
>(MIDTRANS_MODULE_OPTIONS) {
  static Deferred = MidtransModule.externallyConfigured(MidtransModule, 0);
}
