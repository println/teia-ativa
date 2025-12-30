import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AppSettings } from '../../config/app.config';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themes = AppSettings.features.theme.available;
  currentTheme = AppSettings.features.theme.default;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && this.themes.includes(savedTheme)) {
        this.currentTheme = savedTheme;
      }
      this.applyTheme(this.currentTheme);
    }
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const isDark = this.currentTheme.includes('-dark');
    // Assuming the base theme is teia-ativa-original for now, or determining base from current
    // Simple toggle between the main project themes
    if (isDark) {
      this.setTheme('teia-ativa-original');
    } else {
      this.setTheme('teia-ativa-original-dark');
    }
  }

  get isDark(): boolean {
    return this.currentTheme.includes('-dark');
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme.toLowerCase().includes('dark') || theme === 'black' || theme === 'luxury' || theme === 'business' || theme === 'night' || theme === 'coffee' || theme === 'dim') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
