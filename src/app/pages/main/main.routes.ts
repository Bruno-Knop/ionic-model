import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Services/authentication/auth.guard';

import { MainPage } from './main.page';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./views/home/home.page').then((m) => m.HomePage),
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/main/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full',
  },
];
