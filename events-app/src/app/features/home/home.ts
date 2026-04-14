import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor() {
  document.body.classList.add('home-active');
}

ngOnDestroy() {
  document.body.classList.remove('home-active');
}

}
