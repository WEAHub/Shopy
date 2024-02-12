import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SubscribeInputComponent } from '@shared/components/subscribe-input/subscribe-input.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [SubscribeInputComponent, DirectivesModule],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingHomeComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
    autoplay: true,
    loop: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slideChange(swiper: any) {
    console.log(swiper);
  }
}
