import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from '@shared/directives/directives.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from '@assets/i18n/en.json';
import { AppStoreModule } from '@app/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderLanguageSwitchComponent } from './header-language-switch.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { TranslateService } from '@ngx-translate/core';

describe('Header', () => {
  let component: HeaderLanguageSwitchComponent;
  let fixture: ComponentFixture<HeaderLanguageSwitchComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
    const translations = en as never;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppStoreModule,
        HeaderUserButtonComponent,
        DirectivesModule,
        PrimeNGModule,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
    }).compileComponents();
    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HeaderLanguageSwitchComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLanguageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the language button', () => {
    expect(component).toBeTruthy();
  });

  it('language button should change the language', () => {
    const language = 'es';
    const langSpy = jest.spyOn(component, 'changeLanguage');
    const tranSpy = jest.spyOn(translate, 'use');
    component.changeLanguage(language);
    expect(langSpy).toHaveBeenCalledWith(language);
    expect(tranSpy).toHaveBeenCalledWith(language);
    expect(translate.currentLang).toEqual(language);
  });
});
