import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ProductsParameters,
  ProductsSorts,
} from '@shared/interfaces/backend/product/ProductsRequest';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-filters',
  standalone: true,
  imports: [CommonModule, PrimeNGModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss',
})
export class ProductsFiltersComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  @Output() filtersChange = new EventEmitter<ProductsParameters>();
  filtersForm!: FormGroup;

  limits: number[] = [5, 10, 15, 20, 30];
  sorts: string[] = Object.entries(ProductsSorts).map(([, sort]) => sort);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.filtersForm = this.fb.group({
      limit: [],
      sort: [],
    });

    this.filtersForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.onFiltersChange.bind(this));
  }

  onFiltersChange(filters: ProductsParameters): void {
    this.filtersChange.emit(filters);
  }
}
