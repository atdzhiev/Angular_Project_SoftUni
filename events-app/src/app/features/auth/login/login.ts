import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
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

  submit(form: NgForm) {
    this.auth.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: () => {
        this.email.set('');
        this.password.set('');

        form.resetForm();

        this.router.navigate(['/']);
      },
      error: () => {
        form.resetForm();
      }
    });
  }

  onInputChange() {
    this.auth.clearError();
  }
}
