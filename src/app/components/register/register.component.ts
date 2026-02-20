import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <div class="card" style="max-width:520px;margin:2rem auto">
    <h2>Create account</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input class="input" placeholder="Full name" formControlName="fullName" />
      <input class="input" placeholder="Email" formControlName="email" />
      <input type="password" class="input" placeholder="Password" formControlName="password" />
      <input type="password" class="input" placeholder="Confirm password" formControlName="confirmPassword" />
      <select class="input" formControlName="role">
        <option value="STUDENT">Student</option>
        <option value="INSTRUCTOR">Instructor</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
      </select>
      <div style="display:flex;gap:.5rem;align-items:center">
        <button class="btn" type="submit">Register</button>
        <a routerLink="/login" class="muted">Back to login</a>
      </div>
      <div *ngIf="error" class="muted">{{error}}</div>
    </form>
  </div>
  `
})
export class RegisterComponent{
  error: string | null = null;
  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role: ['STUDENT', Validators.required]
  }, { validators: this.passwordMatch });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  passwordMatch(group: any){
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { mismatch: true };
  }

  submit(){
    if(this.form.invalid){ this.form.markAllAsTouched(); this.error = 'Please fix errors'; return; }
    const {fullName,email,password,role} = this.form.value;
    this.auth.register({fullName,email,password,role}).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = err?.error?.message || 'Registration failed'
    });
  }
}
