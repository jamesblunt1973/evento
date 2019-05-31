import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeweventComponent } from './newevent/newevent.component';

const newRoutes: Routes = [
  { path: '', component: NeweventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
