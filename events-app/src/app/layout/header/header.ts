import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

  auth = inject(AuthService);
  router = inject(Router);

  
  user() {
    return this.auth.user(); // 
  }

  testClick() {
  console.log('OUTSIDE CLICK WORKS');
}

  logout() {
    console.log("dadaada");
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Logout failed', err)
    });
  }
}
