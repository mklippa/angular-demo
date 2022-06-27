import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card-button',
  template: `
    <button
      class="btn btn-success w-100"
      (click)="btnClick.emit($event)"
      [attr.disabled]="disabled ? '' : null"
    >
      {{ text }}
    </button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() disabled = false;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
