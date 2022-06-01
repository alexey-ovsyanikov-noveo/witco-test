import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { API_INTERCEPTOR_PROVIDER } from './interceptors/provider';

@NgModule({
  imports: [HttpClientModule],
  providers: [API_INTERCEPTOR_PROVIDER],
})
export class CoreModule {}
