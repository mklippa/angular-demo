import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toggle',
  template: `
    <div class="btn-group">
      <ng-container *ngFor="let option of options">
        <button
          *ngIf="option"
          class="btn btn-primary"
          (click)="onClick(option)"
          [class.active]="option === activeOption"
        >
          {{ option }}
        </button>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class ToggleComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() activeOption?: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onClick(opt: string): void {
    if (opt === this.activeOption) return;
    this.activeOption = opt;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { toggle: opt },
    });
  }
}
