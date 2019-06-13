import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { ListComponent } from './list/list.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: NewEventComponent },
  { path: 'edit/:id', component: EditEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
