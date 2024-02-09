import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from '@shared/directives/directives.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import en from '@assets/i18n/en.json';
import { AppStoreModule } from '@app/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderCartComponent } from './header-cart.component';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { HeaderCartProductComponent } from '../header-cart-product/header-cart-product.component';
import { HeaderUserButtonComponent } from '../header-user-button/header-user-button.component';
import { CartFacade } from '@app/store/cart';
import { CartProduct } from '@shared/interfaces/carts/Cart';

describe('Header', () => {
  let component: HeaderCartComponent;
  let fixture: ComponentFixture<HeaderCartComponent>;
  let cartFacade: CartFacade;
  beforeEach(async () => {
    const translations = en as never;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppStoreModule,
        PrimeNGModule,
        HeaderUserButtonComponent,
        DirectivesModule,
        HeaderCartProductComponent,
        LoadingOverlayComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
      providers: [CartFacade],
    }).compileComponents();
    cartFacade = TestBed.inject(CartFacade);
    fixture = TestBed.createComponent(HeaderCartComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('header-car should call deleteProduct', () => {
    const delSpy = jest.spyOn(component, 'deleteProduct');
    const cartSpy = jest.spyOn(cartFacade, 'deleteProduct');
    const product: CartProduct = { productId: 1, quantity: 1 };
    component.deleteProduct(product);
    expect(delSpy).toHaveBeenCalledWith(product);
    expect(cartSpy).toHaveBeenCalledWith(product);
  });

  it('header-car should call updateProduct', () => {
    const quantitySpy = jest.spyOn(component, 'quantityChanged');
    const cartSpy = jest.spyOn(cartFacade, 'updateProduct');
    const product: CartProduct = { productId: 1, quantity: 1 };
    component.quantityChanged(product);
    expect(quantitySpy).toHaveBeenCalledWith(product);
    expect(cartSpy).toHaveBeenCalledWith(product);
  });
});
