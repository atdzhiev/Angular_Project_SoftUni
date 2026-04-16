import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from '../../../core/services/notifier';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   private auth = inject(AuthService);
  private router = inject(Router);
  private notifier = inject(NotifierService)

  
  username = signal('');
  email = signal('');
  password = signal('');
  repass = signal('');

 
  loading = computed(() => this.auth.loading());
  error = computed(() => this.auth.error());
 
  localError = signal<string | null>(null);

  markAllAsTouched(form: NgForm) {
  Object.values(form.controls).forEach(control => {
    control.markAsTouched();
  });
}

  submit(form:NgForm) {

    if (form.invalid || this.password() !== this.repass()) {
    this.markAllAsTouched(form);
    this.showRequiredNotification();
    return;
  }
   
    if (this.password() !== this.repass()) {
      this.localError.set('Passwords do not match');
      return;
    }

    this.localError.set(null);

    this.auth.register({
      username: this.username(),
      email: this.email(),
      password: this.password(),
      rePassword: this.repass()
    }).subscribe({
      next: () => this.router.navigate(['/'])
    });
  }

  showRequiredNotification() {
  this.notifier.showError('All fields are required.');
}

  onInputChange() {
    this.localError.set(null);
    this.auth.clearError();
  }
}

