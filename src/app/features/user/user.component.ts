import { Component } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserMenuComponent, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {}
