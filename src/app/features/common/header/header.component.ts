import { Component } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { HeaderCategoriesComponent } from '../header-categories/header-categories.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    RouterModule,
    HeaderUserComponent,
    HeaderCategoriesComponent,
    SearchBarComponent,
  ],
})
export class HeaderComponent {}
