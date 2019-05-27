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
  MatSnackBarModule,
  MatRadioModule
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
    MatSnackBarModule,
    MatRadioModule],
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatToolbarModule, 
    MatListModule,
    MatSidenavModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatSnackBarModule,
    MatRadioModule],
})
export class MaterialComponentsModule { }
