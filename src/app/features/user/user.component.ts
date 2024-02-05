import { Component } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserMenuComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {}
