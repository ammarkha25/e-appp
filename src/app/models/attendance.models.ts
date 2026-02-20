export interface AttendanceDto {
  id: string;
  userId: string;
  subjectId: string;
  sessionId: string;
  status: 'PRESENT'|'ABSENT'|'LATE';
  timestamp: string;
}

export interface MarkAttendanceDto {
  subjectId: string;
  deviceFingerprintHash?: string;
}

export interface AttendanceSessionDto {
  id: string;
  subjectId: string;
  openedBy: string;
  openedAt: string;
  closedAt?: string;
  active: boolean;
}

export interface AttendanceReportDto {
  userId: string;
  subjectId: string;
  presentCount: number;
  absentCount: number;
  percentage: number;
}
