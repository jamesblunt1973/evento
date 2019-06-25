import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPhoto } from '../models/photo.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnDestroy {

  @Input() photo: IPhoto;
  @Output() delete = new EventEmitter<IPhoto>();
  private subscriptions: Array<Subscription> = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  deletePhoto() {
    const sub = this.eventsService.deletePhoto(this.photo.id).subscribe(() => {
      this.delete.emit(this.photo);
    });
    this.subscriptions.push(sub);
  }

  updatePhoto() {
    const sub = this.eventsService.updatePhoto(this.photo).subscribe();
    this.subscriptions.push(sub);
  }

}
