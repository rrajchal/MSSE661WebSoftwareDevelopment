import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [ngClass]="buttonClass" (click)="onClick($event)">{{ label }}</button>`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() buttonClass: string = '';
  @Input() onClick: (event: Event) => void = () => {};
}
