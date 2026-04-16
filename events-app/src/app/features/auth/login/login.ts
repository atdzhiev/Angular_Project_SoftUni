import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier';

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
  private notifier = inject(NotifierService);

  email = signal('');
  password = signal('');

  loading = computed(() => this.auth.loading());
  error = computed(() => this.auth.error());

  markAllAsTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  submit(form: NgForm) {

    if (form.invalid) {
      this.markAllAsTouched(form);
      this.showRequiredNotification();
      return;
    }

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

  showRequiredNotification() {
    this.notifier.showError('All fields are required.');
  }

  onInputChange() {
    this.auth.clearError();
  }
}
