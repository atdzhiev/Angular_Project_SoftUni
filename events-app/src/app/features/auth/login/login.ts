import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  loading = computed(() => this.auth.loading());
  error = computed(() => this.auth.error());

  submit() {
    this.auth.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }

  onInputChange() {
    this.auth.clearError();
  }
}

