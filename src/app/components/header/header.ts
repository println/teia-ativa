import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AppSettings } from '../../config/app.config';
import { ROUTES } from '../../config/routes.config';
import { UiStore } from '../../store/ui.store';
import { AsyncPipe } from '@angular/common';

import { LogoComponent } from '../shared/logo/logo.component';
import { LogoIconComponent } from '../shared/logo/logo-icon.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, LogoIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private uiStore = inject(UiStore);
  isDark$ = this.uiStore.isDark$;
  routes = ROUTES;
  isMenuOpen = false;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  constructor() { }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      // Scrola pro topo independentemente de mudar de página se já estiver nas páginas de home
      if (this.router.url === '/' || this.router.url === '/empresa' || this.router.url === '/escola' || this.router.url === '/gestao-publica') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  scrollToOffers() {
    if (isPlatformBrowser(this.platformId)) {
      // Usar timeout para permitir que o Angular Navigation ocorra primeiro (mudança de aba da URL)
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
        }
      }, 100);
    }
  }

  toggleTheme() {
    this.uiStore.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
