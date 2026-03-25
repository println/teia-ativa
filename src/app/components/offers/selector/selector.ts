import { Component, PLATFORM_ID, inject, input, output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '@config/routes.config';

@Component({
  selector: 'app-selector',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './selector.html',
  host: { style: 'display: contents' }
})
export class Selector {
  ROUTES = ROUTES;
  variant = input<'default' | 'header' | 'mobile'>('default');
  onSelect = output<void>();

  private platformId = inject(PLATFORM_ID);

  scrollToContent() {
    this.onSelect.emit();
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }
}
