import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number;
  @Output() ratingClick = new EventEmitter<number>();

  inputName: string;

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit(rating);
  }
}
