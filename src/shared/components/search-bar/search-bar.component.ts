import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { ProductsFacade } from '@app/store/products';
import { Products } from '@shared/interfaces/products/Product';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Observable, lastValueFrom, map } from 'rxjs';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SearchResultComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  filteredProducts!: Products
  searchForm!: FormGroup;
  products$: Observable<Products> = this.productsFacade.getProducts$()

  constructor(
    private fb: FormBuilder,
    private productsFacade: ProductsFacade
  ) {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  public async filterProducts(event: AutoCompleteCompleteEvent): Promise<void> {
    const query  = event.query.toLowerCase()
    this.filteredProducts = await lastValueFrom(
      this.productsFacade.findProductsByWord$(query)
        .pipe(map(this.truncateNames))
    );
  }

  public truncateNames(products: Products): Products {
    return products.map(p => ({
      ...p,
      title: p.title.substring(0, 50)
    }))
  }

  public selectProduct(event: AutoCompleteSelectEvent): void {
    const { value: product } = event;
    navigate
  }

}
