import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {

  isAuth$: Observable<boolean> = this.authFacade.isAuthenticated$()
  isLoading$: Observable<boolean> = this.authFacade.isLoading$()
  user$: Observable<User> = this.authFacade.getUser$()

  constructor(private authFacade: AuthFacade) {}

}
