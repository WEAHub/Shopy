import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from '@shared/directives/directives.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from '@assets/i18n/en.json';
import { AppStoreModule } from '@app/store';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { AuthFacade } from '@app/store/auth';
import { HeaderCartComponent } from '../header-cart/header-cart.component';
import { PipesModule } from '@shared/pipes';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { HeaderUserComponent } from './header-user.component';
import { Router } from '@angular/router';

describe('Header', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;
  let authFacade: AuthFacade;
  let router: Router;

  beforeEach(async () => {
    const translations = en as never;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppStoreModule,
        PrimeNGModule,
        HeaderUserButtonComponent,
        PipesModule,
        DirectivesModule,
        HeaderCartComponent,
        LoadingOverlayComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
      providers: [AuthFacade],
    }).compileComponents();
    authFacade = TestBed.inject(AuthFacade);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the language button', () => {
    expect(component).toBeTruthy();
  });

  it('force login should call the service', () => {
    const loginSpy = jest.spyOn(component, 'login');
    const authSpy = jest.spyOn(authFacade, 'forceLogin');
    const authLoginSpy = jest.spyOn(authFacade, 'login');

    component.login();

    const loginBody = {
      username: 'mor_2314',
      password: '83r5^_',
    };

    expect(loginSpy).toHaveBeenCalled();
    expect(authSpy).toHaveBeenCalled();
    expect(authLoginSpy).toHaveBeenCalledWith(loginBody);
  });

  it('edit profile link should redirect to /user', () => {
    const editSpy = jest.spyOn(component, 'editProfile');
    const routerSpy = jest.spyOn(router, 'navigateByUrl');

    component.editProfile();

    expect(editSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/user');
  });

  it('logout should redirect to landing and logout', () => {
    const logoutComponentSpy = jest.spyOn(component, 'logout');
    const logoutSpy = jest.spyOn(authFacade, 'logout');
    const routerSpy = jest.spyOn(router, 'navigateByUrl');

    component.logout();

    expect(logoutComponentSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/landing');
    expect(logoutSpy).toHaveBeenCalled();
  });
});
