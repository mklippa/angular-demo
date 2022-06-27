import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="vh-100">
      <h1 class="position-absolute top-50 start-50 translate-middle display-1">
        404 Not Found
      </h1>
    </div>
  `,
  styles: [],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
