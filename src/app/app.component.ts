import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/common/header/header.component';
import { FooterComponent } from './features/common/footer/footer.component';
import { HeaderCategoriesComponent } from './features/common/header-categories/header-categories.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment.base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private destroyRef = inject(DestroyRef);
  title = 'Shopy-Front';

  constructor(
    private ngConfig: PrimeNGConfig,
    private translate: TranslateService
  ) {
    this.initTranslations();
  }

  private initTranslations(): void {
    // APP Translations
    const { defaultLang } = environment;
    const browserLang = this.translate.getBrowserLang();
    const currentLang =
      environment.languages.find(language => language === browserLang) ??
      defaultLang;

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
}
