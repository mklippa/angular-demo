import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-card-title',
  template: `
    <h5
      #titleRef
      (mouseover)="titleRef.classList.add('text-secondary')"
      (mouseout)="titleRef.classList.remove('text-secondary')"
    >
      {{ title }}
    </h5>
  `,
  styles: [
    `
      h5 {
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent implements OnInit {
  @Input() title!: string;

  constructor() {}

  ngOnInit(): void {}
}
