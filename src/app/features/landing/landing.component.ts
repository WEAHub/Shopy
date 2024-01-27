import { Component, OnInit } from '@angular/core';
import { LandingRoutingModule } from './landing.routes';
import { AuthFacade } from '@app/store/auth';
import { LoginRequestBody } from '@shared/interfaces/backend/login/LoginRequest';
/*
import { UserFacade } from '@app/store/user/facades/user.facade';
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
*/

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [
    LandingRoutingModule
  ]
})
export class LandingComponent implements OnInit {

  constructor(
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
 
    const loginBody: LoginRequestBody = {
      username: 'mor_2314',
      password: '83r5^_'
    }

    this.authFacade.login(loginBody)
    
  }
}
