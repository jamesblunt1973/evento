import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  progress: number;
  @Output() public uploadComplete = new EventEmitter();

  constructor(private eventService: EventsService) { }

  ngOnInit() {
  }

  upload(files) {
    if (files.length === 0)
      return;
    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    this.eventService.upload(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        // for (var i in event.body)
        //   this.images.push(event.body[i]);
        this.uploadComplete.emit(event.body);
      }
    });
  }
}
