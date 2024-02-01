import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/common/header/header.component';
import { FooterComponent } from './features/common/footer/footer.component';
import { HeaderCategoriesComponent } from './features/common/header-categories/header-categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeaderCategoriesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Shopy-Front';
}
