import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router: Router) {
    document.body.classList.add('home-active');
  }

  ngOnDestroy() {
    document.body.classList.remove('home-active');
  }

  search(form: NgForm) {
    const keyword = form.value.searchText || '';
    const town = form.value.town || '';

    this.router.navigate(['/events'], {
      queryParams: {
        q: keyword || null,
        town: town || null
      }
    });
  }
}
