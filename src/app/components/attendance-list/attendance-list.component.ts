import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceDto } from '../../models/attendance.models';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>My Attendance</h3>
      <div *ngIf="loading" class="spinner"></div>
      <table *ngIf="!loading" style="width:100%">
        <tr><th>Subject</th><th>Session</th><th>Status</th><th>Time</th></tr>
        <tr *ngFor="let a of attendance">
          <td>{{a.subjectId}}</td>
          <td>{{a.sessionId}}</td>
          <td>{{a.status}}</td>
          <td>{{a.timestamp | date:'short'}}</td>
        </tr>
      </table>
    </div>
  `
})
export class AttendanceListComponent implements OnInit{
  attendance: AttendanceDto[] = [];
  loading = false;
  constructor(private attendanceService: AttendanceService){}
  ngOnInit(){
    this.loading = true;
    this.attendanceService.myAttendance().subscribe({ next: a => { this.attendance = a; this.loading = false; }, error: () => this.loading = false });
  }
}
