import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
})
export class LoadingOverlayComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() fontSizeRem: string = '2.5rem';
  fontSizeClass: string = `text-[${this.fontSizeRem}]`;
  ngOnInit(): void {
    this.fontSizeClass = `text-[${this.fontSizeRem}]`;
  }
}
