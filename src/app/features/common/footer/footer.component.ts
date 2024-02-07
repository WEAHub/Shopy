import { Component } from '@angular/core';
import { DirectivesModule } from '@shared/directives/directives.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DirectivesModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
