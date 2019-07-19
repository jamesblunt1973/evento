import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { uiReducer } from './state/ui.reducer';
import { MainSearchComponent } from './main-search/main-search.component';
import { EventComponent } from './event/event.component';
//import { eventsReducer } from './state/events.reducers';
//import { EventsEffects } from './state/events.effects';
import { SharedModule } from '../shared/shared.module';

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
    StoreModule.forFeature('uiState', uiReducer),
    //StoreModule.forFeature('eventsState', eventsReducer),
    //EffectsModule.forFeature([EventsEffects]),
    LeafletModule.forRoot(),
  ],
  exports: [
    LayoutComponent, 
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
