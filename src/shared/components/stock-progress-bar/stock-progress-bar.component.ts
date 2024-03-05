import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { percentage } from '@shared/utils/product-randomizer';

@Component({
  selector: 'app-stock-progress-bar',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './stock-progress-bar.component.html',
  styleUrl: './stock-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockProgressBarComponent implements OnInit {
  @Input() partial: number = 0;
  @Input() total: number = 0;
  public percent: number = 0;

  ngOnInit(): void {
    this.percent = percentage(this.partial, this.total);
  }
}
