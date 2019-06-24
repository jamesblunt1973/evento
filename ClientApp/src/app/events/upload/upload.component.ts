import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { EventsService } from '../events.service';
import { IPhoto } from '../models/photo.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  progress: number;
  @Output() uploadComplete = new EventEmitter<IPhoto[]>();
  @Input() eventId: number;

  constructor(private eventService: EventsService) { }

  ngOnInit() {
  }

  upload(files) {
    if (files.length === 0)
      return;
    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    formData.append('id', this.eventId.toString());
    this.eventService.upload(formData).subscribe(e => {
      if (e.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * e.loaded / e.total);
      else if (e.type === HttpEventType.Response) {
        this.uploadComplete.emit(e.body);
      }
    });
  }
}
