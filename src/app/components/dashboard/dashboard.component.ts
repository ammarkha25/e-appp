import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid cols-3">
      <div class="card">
        <h3>Active Sessions</h3>
        <div *ngIf="loading" class="spinner"></div>
        <div *ngIf="!loading">{{ sessions.length || 0 }}</div>
      </div>
      <div class="card">
        <h3>Present</h3>
        <div>{{present || 0}}</div>
      </div>
      <div class="card">
        <h3>Absent</h3>
        <div>{{absent || 0}}</div>
      </div>
    </div>
    <div style="margin-top:1rem" class="card">
      <h3>Quick Start</h3>
      <ol>
        <li>Register / Login</li>
        <li>Students: Mark attendance</li>
        <li>Faculty: Open/Close sessions</li>
      </ol>
    </div>
  `
})
export class DashboardComponent implements OnInit{
  sessions: any[] = [];
  loading = false;
  present = 0;
  absent = 0;
  constructor(private attendance: AttendanceService){}
  ngOnInit(){
    this.loading = true;
    this.attendance.activeSessions().subscribe({
      next: s => { this.sessions = s; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
