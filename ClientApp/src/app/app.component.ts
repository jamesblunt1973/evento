import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.checkUser();    
  }
}
