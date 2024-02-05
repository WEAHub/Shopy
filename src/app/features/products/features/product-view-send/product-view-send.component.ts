import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@app/store/auth';
import { CartFacade } from '@app/store/cart';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { CartProduct } from '@shared/interfaces/carts/Cart';
import { Product } from '@shared/interfaces/products/Product';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { combineLatestWith, map } from 'rxjs';

@Component({
  selector: 'app-product-view-send',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    LoadingOverlayComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-view-send.component.html',
  styleUrl: './product-view-send.component.scss',
})
export class ProductViewSendComponent {
  @Input() product!: Product;

  user$ = this.authFacade.getUser$();
  userAuth$ = this.authFacade.isAuthenticated$();
  userLoading$ = this.authFacade.isLoading$();

  cartLoading$ = this.cartFacade.isLoading$();

  addToCartDisabled$ = this.userLoading$.pipe(
    combineLatestWith(this.userAuth$),
    map(([loading, auth]) => loading || !auth)
  );

  productForm!: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private cartFacade: CartFacade,
    private fb: FormBuilder
  ) {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.productForm = this.fb.group({
      quantity: [1, Validators.min(1)],
    });
  }

  addToCart(): void {
    if (this.productForm.invalid) return;

    const { quantity } = this.productForm.value;
    const productId = this.product.id;

    const cartProduct: CartProduct = {
      productId,
      quantity,
    };

    this.cartFacade.addProduct(cartProduct);
  }
}
