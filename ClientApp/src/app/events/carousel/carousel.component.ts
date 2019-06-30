import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IPhoto } from '../models/photo.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  @Input() eventId: number = 0;
  @Input() images: Array<string> = [];
  @Output() select = new EventEmitter<IPhoto>();

  constructor() { }

  selectPhoto(photo: IPhoto) {
    this.select.emit(photo);
  }

}
