import { MenuItem } from 'primeng/api';

type MenuCallback = () => void;

interface UserMenuCallbacks {
  editProfile: MenuCallback;
  logout: MenuCallback;
}

export class UserMenu {
  private menuItems: MenuItem[] = [
    {
      label: 'Editar perfil',
      icon: 'pi pi-user',
    },
    {
      label: 'Desconectar',
      icon: 'lni lni-unlink',
    },
  ];

  constructor(callbacks: UserMenuCallbacks) {
    const menuArray = Object.entries(callbacks);
    this.menuItems = this.menuItems.map((menu, i) => ({
      ...menu,
      command: menuArray[i][1],
    }));
  }

  getMenus(): MenuItem[] {
    return this.menuItems;
  }
}
