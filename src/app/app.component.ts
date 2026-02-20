import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <div style="display:flex;flex-direction:column;gap:.75rem">
          <a routerLink="/dashboard" class="btn">Dashboard</a>
          <a routerLink="/attendance/mark" class="btn">Mark Attendance</a>
          <a routerLink="/attendance/list" class="btn">My Attendance</a>
          <a *ngIf="isFacultyOrInstructor" routerLink="/attendance/sessions" class="btn">Manage Sessions</a>
          <a *ngIf="isAdmin" routerLink="/reports" class="btn">Reports</a>
        </div>
      </aside>
      <div class="main">
        <header class="header" style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="font-weight:700">Attendance</div>
            <div class="muted">Management System</div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div *ngIf="user$ | async as user" style="display:flex;align-items:center;gap:.5rem">
              <div>{{user.fullName}}</div>
              <button class="btn" (click)="logout()">Logout</button>
            </div>
          </div>
        </header>
        <main style="margin-top:1rem"><router-outlet></router-outlet></main>
      </div>
    </div>
  `,
  styles: [``]
})
export class AppComponent {
  user$ = this.auth.user$;
  isAdmin = false;
  isFacultyOrInstructor = false;
  constructor(private auth: AuthService, private router: Router) {
    this.user$.subscribe(u => {
      this.isAdmin = !!u && u.role === 'ADMIN';
      this.isFacultyOrInstructor = !!u && (u.role === 'FACULTY' || u.role === 'INSTRUCTOR');
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
