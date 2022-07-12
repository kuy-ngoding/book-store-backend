import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { RAJAONGKIR_MODULE_OPTIONS } from './rajaongkir.constant';
import { RajaOngkirModuleOptions } from './rajaongkir.options';
import { RajaOngkirService } from './usecase/rajaongkir.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RajaOngkirService],
  exports: [RajaOngkirService],
})
export class RajaOngkirModule extends createConfigurableDynamicRootModule<
  RajaOngkirModule,
  RajaOngkirModuleOptions
>(RAJAONGKIR_MODULE_OPTIONS) {
  static Deferred = RajaOngkirModule.externallyConfigured(RajaOngkirModule, 0);
}
