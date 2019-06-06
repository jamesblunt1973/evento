import { Component, OnInit, Input } from '@angular/core';
import { IEventSummury } from '../../shared/models/eventSummury';
import { ITag } from '../../shared/models/tag.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: IEventSummury;
  @Input() tag: ITag;

  constructor() { }

  ngOnInit() {
  }

}
