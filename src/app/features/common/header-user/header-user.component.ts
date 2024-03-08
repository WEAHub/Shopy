import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable } from 'rxjs';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { PipesModule } from '@shared/pipes';
import { DirectivesModule } from '@shared/directives/directives.module';
import { HeaderCartComponent } from '../header-cart/header-cart.component';
import { UserMenu } from './header-user.menu';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginModalComponent } from '@shared/components/login-modal/login-modal.component';
import { TranslateModule } from '@ngx-translate/core';

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
    LoadingOverlayComponent,
    LoginModalComponent,
    TranslateModule,
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  @ViewChild('loginModal') loginModal!: LoginModalComponent;

  isAuth$: Observable<boolean> = this.authFacade.isAuthenticated$();
  isLoading$: Observable<boolean> = this.authFacade.isLoading$();
  user$: Observable<User> = this.authFacade.getUser$();

  userMenu = new UserMenu({
    editProfile: this.editProfile.bind(this),
    logout: this.logout.bind(this),
  });

  userMenuItems: MenuItem[] = this.userMenu.getMenus();

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  editProfile(): void {
    this.router.navigateByUrl('/user');
  }

  async logout(): Promise<void> {
    await this.router.navigateByUrl('/landing');
    this.authFacade.logout();
  }
}
