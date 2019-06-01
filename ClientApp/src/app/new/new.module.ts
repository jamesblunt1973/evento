import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { NewRoutingModule } from './new-routing.module';
import { NeweventComponent } from './newevent/newevent.component';
import { NewEventService } from './newevent.service';

@NgModule({
  declarations: [
    NeweventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NewRoutingModule,
    LeafletModule.forRoot(),
    NgxMaterialTimepickerModule
  ],
  providers: [NewEventService] // Preventring circular dependency
})
export class NewModule { }
