import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { environment } from '@environments/environment.base';
import { MenuItem } from 'primeng/api';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-header-language-switch',
  standalone: true,
  imports: [
    CommonModule,
    HeaderUserButtonComponent,
    TranslateModule,
    CommonModule,
    DirectivesModule,
    PrimeNGModule,
  ],
  templateUrl: './header-language-switch.component.html',
  styleUrl: './header-language-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLanguageSwitchComponent {
  initialLang: Partial<LangChangeEvent> = {
    lang: this.translateService.currentLang,
  };

  language: Observable<string> = this.translateService.onLangChange.pipe(
    startWith(this.initialLang),
    map((languageEvent: Partial<LangChangeEvent>) => languageEvent.lang!)
  );

  languages: MenuItem[] = environment.languages.map(lang => ({
    label: lang,
  }));

  constructor(private translateService: TranslateService) {}

  changeLanguage(language: string): void {
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
  }
}
