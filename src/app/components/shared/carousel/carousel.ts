import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, AfterViewInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

// Register Swiper web components
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Carousel implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer', { static: false }) swiperContainer?: ElementRef<any>;
  @ViewChild('contentWrapper', { static: false }) contentWrapper?: ElementRef<HTMLDivElement>;

  @Input() mobileOnly: boolean = false;

  private observer?: MutationObserver;

  ngAfterViewInit() {
    // Use MutationObserver to wait for content to be projected
    if (this.contentWrapper) {
      this.observer = new MutationObserver(() => {
        this.initializeCarousel();
      });

      this.observer.observe(this.contentWrapper.nativeElement, {
        childList: true,
        subtree: true
      });

      // Also try immediately in case content is already there
      setTimeout(() => this.initializeCarousel(), 100);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeCarousel() {
    if (!this.swiperContainer || !this.contentWrapper) {
      return;
    }

    const swiperEl = this.swiperContainer.nativeElement;
    const wrapper = this.contentWrapper.nativeElement;

    // Pegar todos os filhos diretos do wrapper (os divs projetados)
    const items = Array.from(wrapper.children) as HTMLElement[];

    if (items.length === 0) {
      return; // Silently return if no items yet
    }

    // Check if already initialized
    if (swiperEl.children.length > 0) {
      return; // Already initialized
    }

    // Disconnect observer once we have content
    if (this.observer) {
      this.observer.disconnect();
    }

    // Adicionar cada item como um swiper-slide
    items.forEach(item => {
      const slide = document.createElement('swiper-slide');
      // Mover o item para dentro do slide
      slide.appendChild(item);
      swiperEl.appendChild(slide);
    });

    // Configurar e inicializar o Swiper
    const config: any = {
      slidesPerView: 1,
      spaceBetween: 32,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        clickable: true,
      },
      navigation: true,
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 3,
          centeredSlides: false,
        },
      },
    };

    if (this.mobileOnly) {
      config.breakpoints = {
        768: {
          enabled: false,
        }
      };
      // Disable autoplay on desktop if mobileOnly (though enabled: false handles it, good to be safe)
    }

    Object.assign(swiperEl, config);

    swiperEl.initialize();
  }
}
