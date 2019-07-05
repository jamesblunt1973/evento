import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { uiReducer } from './state/ui.reducer';
import { MainSearchComponent } from './main-search/main-search.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    LayoutComponent,
    MainSearchComponent,
    EventComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forFeature('uiState', uiReducer)
  ],
  exports: [
    LayoutComponent, 
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
