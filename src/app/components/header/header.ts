import { Component, PLATFORM_ID, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ROUTES } from '../../config/routes.config';
import { UiStore } from '../../store/ui.store';

import { LogoComponent } from '../shared/logo/logo.component';
import { LogoIconComponent } from '../shared/logo/logo-icon.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, LogoIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private uiStore = inject(UiStore);
  isDark$ = this.uiStore.isDark$;
  showLogo$ = this.uiStore.isHeroVisible$.pipe(map((visible) => !visible));
  showOffersSelector$ = this.uiStore.isOffersSelectorVisible$.pipe(map((visible) => !visible));
  routes = ROUTES;
  isMenuOpen = false;
  isScrolled = false;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.router.url === ROUTES.home.path || this.router.url === ROUTES.organization.path || this.router.url === ROUTES.education.path || this.router.url === ROUTES.public_management.path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  scrollToOffers() {
    if (isPlatformBrowser(this.platformId)) {
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
