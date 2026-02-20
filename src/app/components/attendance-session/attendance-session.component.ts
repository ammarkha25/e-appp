import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h3>Manage Sessions</h3>
      <div style="display:flex;gap:.5rem;align-items:center;margin-bottom:1rem">
        <input class="input" [(ngModel)]="newSubject" placeholder="Subject ID" />
        <button class="btn" (click)="open()">Open Session</button>
      </div>
      <div *ngIf="loading" class="spinner"></div>
      <ul>
        <li *ngFor="let s of sessions">
          {{s.subjectId}} — {{s.active ? 'Active' : 'Closed'}}
          <button *ngIf="s.active" class="btn" (click)="close(s.id)">Close</button>
        </li>
      </ul>
    </div>
  `
})
export class AttendanceSessionComponent implements OnInit{
  sessions: any[] = [];
  loading = false;
  newSubject = '';
  constructor(private attendance: AttendanceService){}
  ngOnInit(){ this.load(); }
  load(){ this.loading=true; this.attendance.activeSessions().subscribe({ next: s => { this.sessions = s; this.loading=false; }, error: () => this.loading=false }); }
  open(){ if(!this.newSubject) return; this.attendance.openSession({ subjectId: this.newSubject }).subscribe({ next: () => { this.newSubject=''; this.load(); } }); }
  close(id: string){ this.attendance.closeSession(id).subscribe({ next: () => this.load() }); }
}
