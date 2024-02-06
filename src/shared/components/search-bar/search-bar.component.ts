import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primeng/autocomplete';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, lastValueFrom, map } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SearchResultComponent } from '../search-result/search-result.component';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Products } from '@shared/interfaces/products/Product';
import { ProductsFacade } from '@app/store/products';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SearchResultComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @ViewChild('autocomplete') autocomplete!: AutoComplete;

  filteredProducts!: Products;
  searchForm!: FormGroup;
  products$: Observable<Products> = this.productsFacade.getProducts$();

  constructor(
    private fb: FormBuilder,
    private productsFacade: ProductsFacade,
    private router: Router
  ) {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.searchForm = this.fb.group({
      search: [null],
    });
  }

  public async filterProducts(
    event: AutoCompleteCompleteEvent
  ): Promise<void> {
    const query = event.query.toLowerCase();
    this.filteredProducts = await lastValueFrom(
      this.productsFacade
        .findProductsByWord$(query)
        .pipe(map(this.truncateNames))
    );
  }

  public truncateNames(products: Products): Products {
    return products.map(p => ({
      ...p,
      title: p.title.substring(0, 50),
    }));
  }

  public selectProduct(): void {
    this.onSearchSubmit();
  }

  public clearInput(): void {
    this.searchForm.get('search')?.setValue(null);
  }

  public onSearchSubmit(): void {
    const { id } = this.searchForm.get('search')?.value;

    this.filteredProducts = [];
    this.autocomplete.hide();
    this.searchForm.reset();

    console.log({ id });
    //this.router.navigateByUrl(`/products/${id}`);
  }
}
