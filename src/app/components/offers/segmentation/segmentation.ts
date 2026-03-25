import { Component, ElementRef, inject, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UiStore } from '@app/store/ui.store';
import { Selector } from '../selector/selector';

@Component({
  selector: 'app-segmentation',
  imports: [Selector],
  templateUrl: './segmentation.html',
  styleUrl: './segmentation.scss',
})
export class Segmentation implements AfterViewInit, OnDestroy {
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
    this.uiStore.setOffersSelectorVisible(false);
  }
}
