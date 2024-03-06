import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/common/header/header.component';
import { FooterComponent } from './features/common/footer/footer.component';
import { HeaderCategoriesComponent } from './features/common/header-categories/header-categories.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment.base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    TranslateModule,
    PrimeNGModule,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private destroyRef = inject(DestroyRef);
  title = 'Shopy';

  constructor(
    private ngConfig: PrimeNGConfig,
    private translate: TranslateService
  ) {
    this.initTranslations();
  }

  initTranslations(): void {
    // APP Translations
    const currentLang = this.getCurrentLang();
    this.translate.addLangs(environment.languages);
    this.translate.setDefaultLang(currentLang);
    this.translate.use(currentLang);

    // PrimeNG Translations
    this.translate
      .get('primeng')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(primeNgTranslations =>
        this.ngConfig.setTranslation(primeNgTranslations)
      );
  }

  getCurrentLang(): string {
    const { defaultLang } = environment;
    const browserLang = this.translate.getBrowserLang();
    // prettier-ignore
    return environment.languages.find(language => language === browserLang) ?? defaultLang;
  }
}
