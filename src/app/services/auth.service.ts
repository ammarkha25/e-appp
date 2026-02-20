import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, UserDto } from '../models/auth.models';

const TOKEN_KEY = 'ams_token';
const USER_KEY = 'ams_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<UserDto | null>(this._loadUser());
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiBase}/auth/login`, payload).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        this._user$.next(res.user);
      }),
      catchError(err => { throw err; })
    );
  }

  register(payload: RegisterRequest) {
    return this.http.post(`${environment.apiBase}/auth/register`, payload).pipe(
      catchError(err => { throw err; })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user$.next(null);
  }

  get token() {
    return localStorage.getItem(TOKEN_KEY) || null;
  }

  get currentUser() {
    return this._user$.value;
  }

  private _loadUser(): UserDto | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) as UserDto : null;
    } catch {
      return null;
    }
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adjust the base URL if your API runs on a different port
  // Backend in this workspace uses https://localhost:7117 by default
  private baseUrl = 'https://localhost:7117/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string; deviceFingerprintHash?: string; deviceName?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
