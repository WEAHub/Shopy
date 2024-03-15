import { BaseLayoutComponent } from '@/shared/components/base-layout/base-layout.component';
import { DirectivesModule } from '@/shared/directives/directives.module';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [BaseLayoutComponent, PrimeNGModule, DirectivesModule],
  templateUrl: './offline.component.html',
  styleUrl: './offline.component.scss',
})
export class OfflineComponent {}
