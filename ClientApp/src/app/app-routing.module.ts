import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeweventComponent } from './newevent/newevent.component'

const routes: Routes = [
  {path: 'new', component: NeweventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
