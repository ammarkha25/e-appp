import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Employeedata } from './component/employeedata/employeedata';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home',component: Home},
    {path: 'employeedata',component: Employeedata},
    {path: '**', redirectTo: 'home' }
];
