import { Component } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { HeaderCategoriesComponent } from '../header-categories/header-categories.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    HeaderUserComponent,
    HeaderCategoriesComponent
  ]
})
export class HeaderComponent {

}
