import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFacade } from '@app/store/products';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchBarComponent } from './search-bar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { productMock, productsMock } from '@shared/mocks/tests';
import { getProducts } from '@app/store/products/selectors/products.selectors';

describe('Search Bar Component', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchBarComponent,
        PrimeNGModule,
        FormsModule,
        ReactiveFormsModule,
        SearchResultComponent,
        HttpClientTestingModule,
      ],
      providers: [
        ProductsFacade,
        provideMockStore({
          initialState: {
            products: {
              entity: productsMock,
            },
          },
          selectors: [
            {
              selector: getProducts,
              value: productsMock,
            },
          ],
        }),
        MockStore,
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the search bar component', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare search form calling prepareForm()', () => {
    const formSpy = jest.spyOn(component, 'prepareForm');
    component.prepareForm();
    expect(component.searchForm).toBeTruthy();
    expect(formSpy).toHaveBeenCalled();
  });

  it('should filter products by word and set them in filteredProducts', () => {
    const filterSpy = jest.spyOn(component, 'filterProducts');
    const event: AutoCompleteCompleteEvent = {
      originalEvent: new Event('test'),
      query: 'man',
    };

    component.filterProducts(event);

    expect(filterSpy).toHaveBeenCalled();
  });

  it('should emit onSearchSubmit() when product is selected', () => {
    const selectSpy = jest.spyOn(component, 'selectProduct');
    const submitSpy = jest.spyOn(component, 'onSearchSubmit');
    component.searchForm.patchValue({
      search: productMock,
    });
    component.selectProduct();
    expect(selectSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should clear searchForm values', () => {
    const clearSpy = jest.spyOn(component, 'clearInput');
    component.clearInput();
    const expected = null;
    expect(component.searchForm.get('search')?.value).toBe(expected);
    expect(clearSpy).toHaveBeenCalled();
  });
});
