import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CartFacade } from '@app/store/cart';
import { Cart, CartProduct } from '@shared/interfaces/carts/Cart';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, filter, take } from 'rxjs';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { HeaderCartProductComponent } from '../header-cart-product/header-cart-product.component';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-header-cart',
  standalone: true,
  imports: [
    PrimeNGModule,
    HeaderUserButtonComponent,
    DirectivesModule,
    HeaderCartProductComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderCartComponent {
  @ViewChild('op', { static: false })
  op?: OverlayPanel;

  cart$: Observable<Cart> = this.cartFacade.getCart$();
  cartLoading$: Observable<boolean> = this.cartFacade.isLoading$();

  cartProductsCount$: Observable<number> =
    this.cartFacade.getCartProductsCount$();

  cartProducts$: Observable<CartProduct[]> = this.cartFacade.getCartProducts$();
  cartTotalPrice$: Observable<number> = this.cartFacade.getCartTotalPrice$();

  constructor(private cartFacade: CartFacade) {}

  deleteProduct(cartProduct: CartProduct): void {
    this.cartFacade.deleteProduct(cartProduct);
  }

  quantityChanged(product: CartProduct): void {
    this.cartFacade.updateProduct(product);
  }

  showCart($event: MouseEvent): void {
    this.cartLoading$
      .pipe(
        take(1),
        filter(loading => !loading)
      )
      .subscribe(() => this.op?.show($event));
  }
}
