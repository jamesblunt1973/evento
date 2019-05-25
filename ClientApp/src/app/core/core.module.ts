import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { uiReducer } from './state/ui.reducer';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    LayoutComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    StoreModule.forFeature('uiState', uiReducer)
  ],
  exports: [
    LayoutComponent, 
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
