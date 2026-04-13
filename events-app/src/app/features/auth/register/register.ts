import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   private auth = inject(AuthService);
  private router = inject(Router);

  
  username = signal('');
  email = signal('');
  password = signal('');
  repass = signal('');

 
  loading = computed(() => this.auth.loading());
  error = computed(() => this.auth.error());

  
  localError = signal<string | null>(null);

  submit() {
   
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

  onInputChange() {
    this.localError.set(null);
    this.auth.clearError();
  }
}

