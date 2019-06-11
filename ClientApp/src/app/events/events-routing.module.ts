import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: 'new', component: NewEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
