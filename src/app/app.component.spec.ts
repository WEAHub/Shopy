import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesFacade } from './store/categories';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from './store/auth';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { CartFacade } from './store/cart';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from './../assets/i18n/es.json';
import { AppStoreModule } from './store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ngConfig: PrimeNGConfig;
  let translate: TranslateService;

  beforeEach(async () => {
    const translations = en as never;

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        PrimeNGModule,
        AppStoreModule,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
      providers: [CategoriesFacade, AuthFacade, CartFacade, PrimeNGConfig],
    }).compileComponents();

    ngConfig = TestBed.inject(PrimeNGConfig);
    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Shopy'`, () => {
    expect(component.title).toEqual('Shopy');
  });

  it(`should have environment loaded`, () => {
    const browserLang = translate.getBrowserLang();
    const currentLang = component.getCurrentLang();
    expect(currentLang).toEqual(browserLang);

    const langSpy = jest
      .spyOn(translate, 'getBrowserLang')
      .mockReturnValue('fr');

    const defaultCurrentLang = component.getCurrentLang();

    expect(langSpy).toHaveReturnedWith('fr');
    expect(defaultCurrentLang).toBe('es');
  });

  it(`PrimeNG Translations`, () => {
    const useSpy = jest.spyOn(translate, 'use');
    const ngSpy = jest.spyOn(ngConfig, 'setTranslation');
    component.initTranslations();
    expect(useSpy).toHaveBeenCalled();
    expect(ngSpy).toHaveBeenCalled();
  });
});
