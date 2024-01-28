import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable } from 'rxjs';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    HeaderUserButtonComponent
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {

  isAuth$: Observable<boolean> = this.authFacade.isAuthenticated$()
  isLoading$: Observable<boolean> = this.authFacade.isLoading$()
  user$: Observable<User> = this.authFacade.getUser$()

  constructor(private authFacade: AuthFacade) {}

}
