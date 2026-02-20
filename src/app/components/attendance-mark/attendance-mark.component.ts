import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-mark',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card" style="max-width:560px;margin:1rem auto">
      <h3>Mark Attendance</h3>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <input class="input" placeholder="Subject ID" formControlName="subjectId" />
        <div style="display:flex;gap:.5rem;align-items:center">
          <button class="btn" type="submit">Mark</button>
          <div *ngIf="loading" class="spinner"></div>
        </div>
        <div class="muted">{{message}}</div>
      </form>
    </div>
  `
})
export class AttendanceMarkComponent{
  form = this.fb.group({ subjectId: ['', Validators.required] });
  loading = false;
  message = '';
  constructor(private fb: FormBuilder, private attendance: AttendanceService){}

  submit(){
    if(this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.message = '';
    const payload = { subjectId: this.form.value.subjectId, deviceFingerprintHash: 'web-'+navigator.userAgent };
    this.attendance.markAttendance(payload).subscribe({ next: () => { this.loading=false; this.message='Marked successfully'; }, error: (e) => { this.loading=false; this.message = e?.error?.message || 'Failed'; } });
  }
}
