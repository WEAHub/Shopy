import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from '@shared/directives/directives.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from '@assets/i18n/en.json';
import { AppStoreModule } from '@app/store';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import {
  FormQuantity,
  HeaderCartProductComponent,
} from './header-cart-product.component';
import { CartProduct } from '@shared/interfaces/carts/Cart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Header', () => {
  let component: HeaderCartProductComponent;
  let fixture: ComponentFixture<HeaderCartProductComponent>;
  beforeEach(async () => {
    const translations = en as never;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppStoreModule,
        DirectivesModule,
        PrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingOverlayComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderCartProductComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCartProductComponent);
    component = fixture.componentInstance;

    component.cartProduct = {
      productId: 1,
      quantity: 1,
      product: {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
        modifiers: {
          discountPercent: 1,
          discountPrice: 1,
          finalPrice: 1,
          stock: 1,
          stockTotal: 1,
          stockPercent: 1,
          stars: 1,
          estimatedDays: 1,
          hasChoice: false,
        },
      },
    };

    fixture.detectChanges();
  });

  it('header-car-product should prepare form', () => {
    const initSpy = jest.spyOn(component, 'ngOnInit');
    const prepareFormSpy = jest.spyOn(component, 'prepareForm');
    fixture.detectChanges();
    component.ngOnInit();
    expect(initSpy).toHaveBeenCalled();
    expect(prepareFormSpy).toHaveBeenCalled();
  });

  it('header-car-product should handle quantity changes', () => {
    const changesSpy = jest.spyOn(component, 'onCartFormChanges');
    const emitSpy = jest.spyOn(component.quantityChanged, 'emit');

    const formData: FormQuantity = {
      quantity: 4,
    };

    component.onCartFormChanges(formData);
    expect(changesSpy).toHaveBeenCalledWith(formData);

    const emitResult = {
      ...component.cartProduct,
      ...formData,
    };
    expect(emitSpy).toHaveBeenCalledWith(emitResult);
  });

  it('header-car-product should remove product from cart', () => {
    const removeSpy = jest.spyOn(component, 'removeFromCart');
    const emitSpy = jest.spyOn(component.productDeleted, 'emit');
    component.removeFromCart();
    expect(removeSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(component.cartProduct);
  });
});
