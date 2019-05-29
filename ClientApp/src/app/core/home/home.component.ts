import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public elements = ["content1", "content2", "content3", "content4"];
  drawerContent: any;


  constructor() { }

  ngOnInit() {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'../../../assets/images/main-bg.jpg\')';
}

  ngOnDestroy(): void {
    this.drawerContent.style.background = '';
  }

  addContent() {
    this.elements.push('new content');
  }

  removeContent() {
    this.elements.pop();
  }
}
