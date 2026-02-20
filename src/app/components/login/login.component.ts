import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <div class="card" style="max-width:420px;margin:2rem auto">
    <h2>Sign in</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input class="input" placeholder="Email" formControlName="email" [class.error]="email.invalid && email.touched" />
      <div *ngIf="email.invalid && email.touched" class="muted">Valid email required</div>

      <input type="password" class="input" placeholder="Password" formControlName="password" [class.error]="password.invalid && password.touched" />
      <div *ngIf="password.invalid && password.touched" class="muted">Password required (min 6)</div>

      <input class="input" placeholder="Device name" formControlName="deviceName" />

      <div style="display:flex;justify-content:space-between;align-items:center">
        <button class="btn" type="submit" [disabled]="loading">{{loading ? 'Signing...' : 'Sign in'}}</button>
        <a routerLink="/register" class="muted">Create account</a>
      </div>
      <div *ngIf="error" class="muted">{{error}}</div>
    </form>
  </div>
  `
})
export class LoginComponent{
  loading = false;
  error: string | null = null;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    deviceName: ['Browser']
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  get email(){return this.form.get('email')!}
  get password(){return this.form.get('password')!}

  submit(){
    if(this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = null;
    const payload = this.form.value;
    this.auth.login(payload).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
      error: (err) => { this.loading = false; this.error = err?.error?.message || 'Login failed'; }
    });
  }
}
