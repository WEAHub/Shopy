import { Component, OnInit } from '@angular/core';
import { LandingRoutingModule } from './landing.routes';

import { AuthFacade } from '@app/store/auth';
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { LandingFeaturedComponent } from './components/landing-featured/landing-featured.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [
    LandingRoutingModule,
    LandingFeaturedComponent
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
