import { Component, OnInit } from '@angular/core';
import { LandingRoutingModule } from './landing.routes';
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
    //private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
/* 
    const loginBody: LoginRequestBody = {
      username: 'mor_2314',
      password: '83r5^_'
    }

    this.userFacade.login(loginBody) */
    
  }
}
