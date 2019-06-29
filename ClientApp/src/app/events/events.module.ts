import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { NewRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventsService } from './events.service';
import { ListComponent } from './list/list.component';
import { PhotosComponent } from './photos/photos.component';
import { UploadComponent } from './upload/upload.component';
import { PhotoComponent } from './photo/photo.component';
import { EventComponent } from './event/event.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    NewEventComponent,
    ListComponent,
    PhotosComponent,
    UploadComponent,
    PhotoComponent,
    EventComponent,
    RatingComponent
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
