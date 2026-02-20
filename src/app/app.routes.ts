import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceMarkComponent } from './components/attendance-mark/attendance-mark.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { AttendanceSessionComponent } from './components/attendance-session/attendance-session.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'attendance/mark', component: AttendanceMarkComponent, canActivate: [AuthGuard], data: { roles: ['STUDENT'] } },
  { path: 'attendance/list', component: AttendanceListComponent, canActivate: [AuthGuard] },
  { path: 'attendance/sessions', component: AttendanceSessionComponent, canActivate: [AuthGuard], data: { roles: ['INSTRUCTOR','FACULTY'] } },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','INSTRUCTOR','FACULTY'] } },
  { path: '**', redirectTo: 'dashboard' }
];

