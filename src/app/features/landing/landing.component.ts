import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '@app/store/auth';
import { LoginRequestBody } from '@interfaces/backend/login/LoginRequest';
import { LandingFeaturedComponent } from './components/landing-featured/landing-featured.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [
    LandingFeaturedComponent
  ]
})
export class LandingComponent implements OnInit {

  constructor(
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    
    this.authFacade.isAuthenticated$().pipe(
      take(1)
    )
    .subscribe(isAuth => {

      if(isAuth) return;

      const loginBody: LoginRequestBody = {
        username: 'mor_2314',
        password: '83r5^_'
      }
  
      this.authFacade.login(loginBody)
      
    })
    
  }
}
