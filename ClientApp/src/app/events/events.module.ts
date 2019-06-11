import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { NewRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventsService } from './events.service';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    NewEventComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NewRoutingModule,
    LeafletModule.forRoot(),
    NgxMaterialTimepickerModule
  ],
  providers: [EventsService] // Preventring circular dependency
})
export class EventsModule { }
