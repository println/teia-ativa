import { Component, ElementRef, inject, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UiStore } from '../../store/ui.store';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  private uiStore = inject(UiStore);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const heroImg = this.elementRef.nativeElement.querySelector('img');
      if (heroImg) {
        this.observer = new IntersectionObserver(
          ([entry]) => {
            this.uiStore.setHeroVisible(entry.isIntersecting);
          },
          { threshold: 0.4 }
        );
        this.observer.observe(heroImg);
      }
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.uiStore.setHeroVisible(true);
  }
}
