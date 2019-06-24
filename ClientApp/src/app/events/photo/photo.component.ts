import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPhoto } from '../models/photo.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input() photo: IPhoto;
  @Output() delete = new EventEmitter<IPhoto>();

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  }

  deletePhoto() {
    this.eventsService.deletePhoto(this.photo.id);
    this.delete.emit(this.photo);
  }

  updatePhoto() {
    this.eventsService.updatePhoto(this.photo);
  }

}
