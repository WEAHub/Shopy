import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DirectivesModule } from '@shared/directives/directives.module';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    DirectivesModule,
    CommonModule,
    NgOptimizedImage,
    LoadingOverlayComponent,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() imageClass: string = 'pv-product__image';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = 'Image';
  @Input() errorImageUrl: string = '/assets/images/not_found_image.jpg';
  loading: boolean = true;

  public onLoad(): void {
    this.loading = false;
  }

  public onError(): void {
    this.loading = false;
    this.imageUrl = this.errorImageUrl;
  }
}
