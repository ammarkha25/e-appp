import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles: string[] = route.data['roles'] || [];
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    if (roles.length === 0) return true;
    if (roles.includes(user.role)) return true;
    this.router.navigate(['/dashboard']);
    return false;
  }
}
