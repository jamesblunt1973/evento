import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public elements = ["content1", "content2", "content3", "content4"];

  constructor() { }

  ngOnInit() {
  }

  addContent() {
    this.elements.push('new content');
  }

  removeContent() {
    this.elements.pop();
  }
}
