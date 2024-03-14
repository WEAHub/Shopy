import { Invoice } from '@/shared/interfaces/checkout/Invoice';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [CommonModule, PrimeNGModule],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.scss',
})
export class CartResumeComponent {
  @Input() invoice!: Invoice;
}
