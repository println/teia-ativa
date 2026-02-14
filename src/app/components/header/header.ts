import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AppSettings } from '../../config/app.config';
import { ROUTES } from '../../config/routes.config';
import { UiStore } from '../../store/ui.store';
import { AsyncPipe } from '@angular/common';

import { LogoComponent } from '../shared/logo/logo.component';
import { LogoIconComponent } from '../shared/logo/logo-icon.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LogoComponent, LogoIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private uiStore = inject(UiStore);
  isDark$ = this.uiStore.isDark$;
  routes = ROUTES;
  isMenuOpen = false;

  constructor() { }

  toggleTheme() {
    this.uiStore.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
