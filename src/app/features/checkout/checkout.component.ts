import { BaseLayoutComponent } from '@/shared/components/base-layout/base-layout.component';
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '@/shared/modules/primeng/primeng.module';
import { DirectivesModule } from '@/shared/directives/directives.module';
import { filter, map, startWith } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    BaseLayoutComponent,
    CommonModule,
    PrimeNGModule,
    DirectivesModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private destroyRef = inject(DestroyRef);

  steps = [
    { label: 'Checkout', link: '/checkout' },
    { label: 'Delivery', link: '/checkout/delivery' },
    { label: 'Payment', link: '/checkout/payment' },
    { label: 'Confirmation', link: '/checkout/confirmation' },
  ];

  step: number = 0;

  constructor(private router: Router) {
    this.initRouteChanges();
  }

  onRouteChange(url: string): number {
    const activeStep = this.getActiveStep(url);
    this.step = activeStep;
    this.refreshSteps();
    return activeStep;
  }

  getActiveStep(url: string): number {
    const lastPath = url.split('/').at(-1);
    return this.steps.findIndex(
      step => step.label.toLocaleLowerCase() === lastPath
    );
  }

  changeStep(stepIndex: number): void {
    const nextStepUrl = this.steps[stepIndex]?.link;
    if (nextStepUrl) {
      this.router.navigateByUrl(nextStepUrl);
      this.step = stepIndex;
    }
  }

  refreshSteps(): void {
    const lastStep = this.steps.length - 1;
    this.steps = this.steps.map((step, stepIndex) => ({
      ...step,
      disabled: this.step === lastStep && this.step < stepIndex,
    }));
  }

  initRouteChanges(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).url),
        map(url => this.onRouteChange(url)),
        startWith(this.onRouteChange(this.router.url))
      )
      .subscribe();
  }
}
