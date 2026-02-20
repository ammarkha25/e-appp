import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" style="max-width:900px;margin:1rem auto">
      <h3>Reports</h3>
      <div class="muted">Select a user and subject to view report (placeholder)</div>
    </div>
  `
})
export class ReportsComponent{
  constructor(private attendance: AttendanceService){}
}
