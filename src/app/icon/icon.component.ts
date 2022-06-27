import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { icons } from './icons';

@Component({
  selector: 'app-icon',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host ::ng-deep svg {
        width: 30px;
        height: 30px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input() set name(value: string) {
    this.element.nativeElement.innerHTML = icons[value] ?? null;
  }
  click$: Observable<Event> = fromEvent(this.element.nativeElement, 'click');

  constructor(private element: ElementRef) {}

  ngOnInit(): void {}

  setColor(color: string): void {
    this.element.nativeElement.style.color = color;
  }

  setCursor(cursor: string): void {
    this.element.nativeElement.style.cursor = cursor;
  }
}
