import { Component, ViewChild } from '@angular/core';
import { CartFacade } from '@app/store/cart';
import { Cart } from '@shared/interfaces/carts/Cart';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable } from 'rxjs';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';

@Component({
  selector: 'app-header-cart',
  standalone: true,
  imports: [PrimeNGModule, HeaderUserButtonComponent],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss',
})
export class HeaderCartComponent {
  @ViewChild('op', { static: false })
  op?: OverlayPanel;

  cart$: Observable<Cart> = this.cartFacade.getCart$();

  cartLoading$: Observable<boolean> = this.cartFacade.isLoading$();
  cartProductsCount$: Observable<number> =
    this.cartFacade.getCartProductsCount$();

  constructor(private cartFacade: CartFacade) {}
}
