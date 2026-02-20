import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AttendanceDto, AttendanceSessionDto, AttendanceReportDto, MarkAttendanceDto } from '../models/attendance.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  constructor(private http: HttpClient) {}

  markAttendance(payload: MarkAttendanceDto) {
    return this.http.post(`${environment.apiBase}/attendance/mark`, payload);
  }

  myAttendance(): Observable<AttendanceDto[]> {
    return this.http.get<AttendanceDto[]>(`${environment.apiBase}/attendance/my-attendance`);
  }

  subjectAttendance(subjectId: string): Observable<AttendanceDto[]> {
    return this.http.get<AttendanceDto[]>(`${environment.apiBase}/attendance/subject/${subjectId}`);
  }

  report(userId: string, subjectId: string): Observable<AttendanceReportDto> {
    return this.http.get<AttendanceReportDto>(`${environment.apiBase}/attendance/report/${userId}/${subjectId}`);
  }

  activeSessions(): Observable<AttendanceSessionDto[]> {
    return this.http.get<AttendanceSessionDto[]>(`${environment.apiBase}/attendance/sessions/active`);
  }

  openSession(payload: Partial<AttendanceSessionDto>) {
    return this.http.post(`${environment.apiBase}/attendance/sessions/open`, payload);
  }

  closeSession(sessionId: string) {
    return this.http.post(`${environment.apiBase}/attendance/sessions/${sessionId}/close`, {});
  }
}
