import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialComponentsModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { AuthInterceptorProvider } from './auth-interceptor';

@NgModule({
  declarations: [],
  imports: [
    MaterialComponentsModule,
    FlexLayoutModule,
    StoreModule.forFeature('authState', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthInterceptorProvider],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
