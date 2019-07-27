import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGetEventsParameter } from '../../shared/models/getEventsParameter';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  @Input() str: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search() {
    var qs: IGetEventsParameter = {};
    if (this.str != '')
      qs.str = this.str;
    this.router.navigate(['/'], { queryParams: qs });
  }

}
