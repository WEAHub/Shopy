import { CartFacade } from '@/app/store/cart';
import { CheckoutFacade } from '@/app/store/checkout';
import { BaseLayoutComponent } from '@/shared/components/base-layout/base-layout.component';
import { Cart, CartProduct } from '@/shared/interfaces/carts/Cart';
import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutProductComponent } from './components/checkout-product/checkout-product.component';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    BaseLayoutComponent,
    CheckoutProductComponent,
    LoadingOverlayComponent,
    CommonModule,
    PrimeNGModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  cart$: Observable<Cart> = this.cartFacade.getCart$();

  cartLoading$: Observable<boolean> = this.cartFacade.isLoading$();

  cartProductsCount$: Observable<number> =
    this.cartFacade.getCartProductsCount$();

  cartProducts$: Observable<CartProduct[]> =
    this.cartFacade.getCartProducts$();

  cartTotalPrice$: Observable<number> =
    this.cartFacade.getCartTotalPrice$();

  constructor(
    private checkoutFacade: CheckoutFacade,
    private cartFacade: CartFacade
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
