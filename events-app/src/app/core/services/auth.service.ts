import { Injectable, signal, computed, effect, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, RegisterData, User } from '../../shared/interfaces/user';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  
  private _user: WritableSignal<User | null> = signal<User | null>(null);
  private _loading: WritableSignal<boolean> = signal<boolean>(false);
  private _error: WritableSignal<string | null> = signal<string | null>(null);

  
  user = computed(() => this._user());
  isLogged = computed(() => !!this._user());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('user');
    if (saved) {
      this._user.set(JSON.parse(saved));
    }

    effect(() => {
      const u = this._user();
      if (u) {
        localStorage.setItem('user', JSON.stringify(u));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  clearError() {
    this._error.set(null);
  }

  register(data: RegisterData) {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<User>(`${this.baseUrl}/register`, data,  { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this._user.set(user);
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set(err?.error?.message || 'Registration failed');
          this._loading.set(false);
        }
      })
    );
  }

  login(data: LoginData) {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<User>(`${this.baseUrl}/login`, data,  { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this._user.set(user);
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set(err?.error?.message || 'Invalid email or password');
          this._loading.set(false);
        }
      })
    );
  }

  logout() {
    this._loading.set(true);

    return this.http.post(`${this.baseUrl}/logout`,  { withCredentials: true }).pipe(
      tap({
        next: () => {
          this._user.set(null);
          this._loading.set(false);
        },
        error: () => {
          this._loading.set(false);
        }
      })
    );
  }
}
