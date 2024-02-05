import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface UserMenuItem {
  route: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  menuItems: UserMenuItem[] = [
    {
      route: 'details',
      title: 'Detalles',
      icon: 'pi pi-user',
    },
    {
      route: 'address',
      title: 'Dirección',
      icon: 'pi pi-map',
    },
    {
      route: 'change-password',
      title: 'Contraseña',
      icon: 'pi pi-key',
    },
  ];
}
