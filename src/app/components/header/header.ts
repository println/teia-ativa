import { Component, PLATFORM_ID, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ROUTES } from '../../config/routes.config';
import { UiStore } from '../../store/ui.store';

import { LogoComponent } from '../shared/logo/logo.component';
import { LogoIconComponent } from '../shared/logo/logo-icon.component';
import { Selector } from '../offers/selector/selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, LogoIconComponent, Selector],
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

  get isHomePage() {
    const path = this.router.url.split('?')[0];
    return [
      ROUTES.home.path, 
      ROUTES.organization.path, 
      ROUTES.education.path, 
      ROUTES.public_management.path
    ].includes(path);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      const path = this.router.url.split('?')[0];
      if ([ROUTES.home.path, ROUTES.organization.path, ROUTES.education.path, ROUTES.public_management.path].includes(path)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  toggleTheme() {
    this.uiStore.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToContact(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        event.preventDefault();
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        this.router.navigate([this.routes.home.fullPath], { fragment: 'contact' });
      }
    }
    this.isMenuOpen = false;
  }
}
