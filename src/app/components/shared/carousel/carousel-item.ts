import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-carousel-item',
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class CarouselItem {
    @ViewChild(TemplateRef, { static: true })
    template!: TemplateRef<any>;
}
