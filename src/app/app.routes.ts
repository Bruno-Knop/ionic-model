import { Routes } from '@angular/router';

import { AuthGuard } from './Services/authentication/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Pages/main/main.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
