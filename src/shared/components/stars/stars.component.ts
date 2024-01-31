import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
})
export class StarsComponent {
  @Input() filledStars: number = 1;
  @Input() maxStars: number = 5;

  constructor() {}
}
