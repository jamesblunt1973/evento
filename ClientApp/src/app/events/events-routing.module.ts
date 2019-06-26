import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { ListComponent } from './list/list.component';
import { PhotosComponent } from './photos/photos.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: EventComponent },
  { path: 'new', component: NewEventComponent },
  { path: 'photos/:id', component: PhotosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
