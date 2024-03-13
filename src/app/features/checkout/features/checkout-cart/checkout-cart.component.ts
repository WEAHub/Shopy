import { CartFacade } from '@/app/store/cart';
import { Cart, CartProduct } from '@/shared/interfaces/carts/Cart';
import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { AuthFacade } from '@/app/store/auth';
import { User } from '@/shared/interfaces/user/User';
import { DirectivesModule } from '@/shared/directives/directives.module';
import { CartProductComponent } from '@/shared/components/cart-product/cart-product.component';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [
    CartProductComponent,
    LoadingOverlayComponent,
    CommonModule,
    PrimeNGModule,
    DirectivesModule,
  ],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.scss',
})
export class CheckoutCartComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  cart$: Observable<Cart> = this.cartFacade.getCart$();

  cartLoading$: Observable<boolean> = this.cartFacade.isLoading$();

  cartProductsCount$: Observable<number> =
    this.cartFacade.getCartProductsCount$();

  cartProducts$: Observable<CartProduct[]> =
    this.cartFacade.getCartProducts$();

  cartTotalPrice$: Observable<number> =
    this.cartFacade.getCartTotalPrice$();

  user$: Observable<User> = this.authFacade.getUser$();

  constructor(
    private cartFacade: CartFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.cartFacade.refreshCart();
  }

  deleteProduct(cartProduct: CartProduct): void {
    this.cartFacade.deleteProduct(cartProduct);
  }

  quantityChanged(product: CartProduct): void {
    this.cartFacade.updateProduct(product);
  }
}
