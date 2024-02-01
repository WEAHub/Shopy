import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable, take } from 'rxjs';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { PipesModule } from '@shared/pipes';
import { LoginRequestBody } from '@shared/interfaces/backend/login/LoginRequest';
import { DirectivesModule } from '@shared/directives/directives.module';
import { HeaderCartComponent } from '../header-cart/header-cart.component';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    HeaderUserButtonComponent,
    PipesModule,
    DirectivesModule,
    HeaderCartComponent,
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  isAuth$: Observable<boolean> = this.authFacade.isAuthenticated$();
  isLoading$: Observable<boolean> = this.authFacade.isLoading$();
  user$: Observable<User> = this.authFacade.getUser$();

  constructor(private authFacade: AuthFacade) {}

  login(): void {
    this.authFacade
      .isAuthenticated$()
      .pipe(take(1))
      .subscribe(isAuth => {
        if (isAuth) return;

        const loginBody: LoginRequestBody = {
          username: 'mor_2314',
          password: '83r5^_',
        };

        this.authFacade.login(loginBody);
      });
  }
}
