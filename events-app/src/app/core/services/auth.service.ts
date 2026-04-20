import { Injectable, signal, computed, effect, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, RegisterData, User } from '../../shared/interfaces/user';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  private _user: WritableSignal<User | null> = signal<User | null>(null);
  private _loading: WritableSignal<boolean> = signal<boolean>(false);
  private _error: WritableSignal<string | null> = signal<string | null>(null);

  user = computed(() => this._user());
  isLogged = computed(() => !!this._user());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');

    if (savedUser && savedToken) {
      this._user.set(JSON.parse(savedUser));
    }

    effect(() => {
      const u = this._user();

      if (u) {
        localStorage.setItem('user', JSON.stringify(u));
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    });
  }

  clearError() {
    this._error.set(null);
  }

  register(data: RegisterData) {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<any>(`${this.baseUrl}/register`, data).pipe(
      tap({
        next: (res) => {
          this._user.set(res.user);
          localStorage.setItem('authToken', res.accessToken);
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

    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap({
        next: (res) => {
          this._user.set(res.user);
          localStorage.setItem('authToken', res.accessToken);
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

    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      tap({
        next: () => {
          this._user.set(null);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          this._loading.set(false);
        },
        error: () => {
          this._loading.set(false);
        }
      })
    );
  }
}