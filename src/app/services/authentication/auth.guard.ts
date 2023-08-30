import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { ControllService } from '../controller.service';

const EXTOKEN = 'expireToken';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private controller: ControllService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expireToken = localStorage.getItem(EXTOKEN);
    if (expireToken !== null) {
      if (Boolean(expireToken)) {
        if (state.url === '/login') {
          this.controller.navigate();
          return false;
        } else {
          return true;
        }
      } else {
        this.controller.navigateLogin();
        return false;
      }
    } else {
      if (state.url === '/login') {
        return true;
      } else {
        this.controller.navigateLogin();
        return false;
      }
    }
  }

  checkAccess(expireToken: string): boolean {
    const newDate = new Date();
    const expireDate = new Date(expireToken);

    if (newDate <= expireDate) {
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
