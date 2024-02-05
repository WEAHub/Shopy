import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details',
      },
      {
        path: 'details',
        loadComponent: () =>
          import('./features/user-details/user-details.component').then(
            m => m.UserDetailsComponent
          ),
      },
      {
        path: 'address',
        loadComponent: () =>
          import('./features/user-address/user-address.component').then(
            m => m.UserAddressComponent
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import(
            './features/user-change-password/user-change-password.component'
          ).then(m => m.UserChangePasswordComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
