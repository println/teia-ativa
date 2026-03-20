import { Component, ElementRef, inject, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '@app/config/routes.config';
import { UiStore } from '@app/store/ui.store';

@Component({
  selector: 'app-segmentation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './segmentation.html',
  styleUrl: './segmentation.scss',
})
export class Segmentation implements AfterViewInit, OnDestroy {
  protected readonly ROUTES = ROUTES;
  private uiStore = inject(UiStore);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const buttonsContainer = this.elementRef.nativeElement.querySelector('.flex-wrap');
      if (buttonsContainer) {
        this.observer = new IntersectionObserver(
          ([entry]) => {
            this.uiStore.setOffersSelectorVisible(entry.isIntersecting);
          },
          { threshold: 1 }
        );
        this.observer.observe(buttonsContainer);
      }
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.uiStore.setOffersSelectorVisible(true);
  }
}
