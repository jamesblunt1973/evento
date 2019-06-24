import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { IPhoto } from '../models/photo.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos$: Observable<IPhoto[]>;
  eventId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => { // ActivatedRoute subs don't require unsubscripbing
      this.eventId = +params.get('id'); // convert to number
      this.photos$ = this.eventService.getEventPhotos(this.eventId);
    });
  }

  addNewFiles(newPhotos: IPhoto[]) {
    this.photos$ = this.photos$.pipe(
      map(photos => {
        // let arr = photos.concat(newPhotos);
        // return arr;
        /*
          the new photos magically append to existing photos array (00)
        */
        return photos;
      })
    );
  }

  deletePhoto(photo: IPhoto) {
    this.photos$ = this.photos$.pipe(
      map(photos => {
        // let arr = photos.concat(newPhotos);
        // return arr;
        /*
          the new photos magically append to existing photos array (00)
        */
        return photos;
      })
    );
  }

}
