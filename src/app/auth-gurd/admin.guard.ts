import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {

    if (this.getData() && this.getRole()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  getData(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    // @ts-ignore
    if (asd === null) {
      return null;
    }
    return !!asd.access_token;
  }

  getRole(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    // @ts-ignore
    if (asd === null) {
      return null;
    }
    return asd.roles[0] === 'ROLE_ADMIN';
  }

}
