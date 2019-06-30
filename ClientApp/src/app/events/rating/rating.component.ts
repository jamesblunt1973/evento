import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number;
  @Input() votes: number;
  @Output() ratingClick = new EventEmitter<number>();

  onClick(rating: number): void {
    this.rating = rating;
    this.votes += 1;
    this.ratingClick.emit(rating);
  }
}
