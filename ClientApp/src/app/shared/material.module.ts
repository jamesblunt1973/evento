import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatIconModule, 
  MatToolbarModule, 
  MatListModule, 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule,
    MatListModule, 
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule],
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule, 
    MatListModule,
    MatSidenavModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatSnackBarModule],
})
export class MaterialComponentsModule { }
