import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend-accelerators';
  constructor(){
    console.log('IN APP COMPONENT TITLE IS::::', this.title);
  }
}
