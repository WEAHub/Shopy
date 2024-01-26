import { Component } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    HeaderUserComponent
  ]
})
export class HeaderComponent {

}
