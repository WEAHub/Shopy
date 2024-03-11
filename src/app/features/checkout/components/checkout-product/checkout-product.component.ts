import { FormQuantity } from '@/app/features/common/header-cart-product/header-cart-product.component';
import { LoadingOverlayComponent } from '@/shared/components/loading-overlay/loading-overlay.component';
import { DirectivesModule } from '@/shared/directives/directives.module';
import { CartProduct } from '@/shared/interfaces/carts/Cart';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-product',
  standalone: true,
  imports: [
    CommonModule,
    DirectivesModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingOverlayComponent,
    RouterModule,
  ],
  templateUrl: './checkout-product.component.html',
  styleUrl: './checkout-product.component.scss',
})
export class CheckoutProductComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  @Output() quantityChanged = new EventEmitter<CartProduct>();
  @Output() productDeleted = new EventEmitter<CartProduct>();
  @Input() cartProduct!: CartProduct;

  cartForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.cartForm = this.fb.group({
      quantity: [this.cartProduct.quantity],
    });

    this.cartForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.onCartFormChanges.bind(this));
  }

  onCartFormChanges(formData: FormQuantity): void {
    const { quantity } = formData;

    const productUpdated: CartProduct = {
      ...this.cartProduct,
      quantity,
    };

    this.quantityChanged.emit(productUpdated);
  }

  removeFromCart(): void {
    this.productDeleted.emit(this.cartProduct);
  }
}
