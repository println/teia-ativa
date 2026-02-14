import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { CarouselItem } from './carousel-item';

register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Carousel implements AfterContentInit, OnDestroy {

  @ContentChildren(CarouselItem)
  items!: QueryList<CarouselItem>;

  @ViewChild('swiperContainer', { static: true })
  swiperContainer!: ElementRef<any>;

  @Input() mobileOnly: boolean = false;

  slides: CarouselItem[] = [];

  ngAfterContentInit() {
    this.updateSlides();

    // Escutar mudanças nos itens (importante para dados dinâmicos/HMR)
    this.items.changes.subscribe(() => {
      this.updateSlides();
    });
  }

  private updateSlides() {
    this.slides = this.items.toArray();
    queueMicrotask(() => this.initializeSwiper());
  }

  ngOnDestroy() {
    const swiperEl = this.swiperContainer?.nativeElement;

    if (swiperEl?.swiper) {
      swiperEl.swiper.destroy(true, true);
    }
  }

  private initializeSwiper() {
    const swiperEl = this.swiperContainer.nativeElement;

    // 1. Destruir instância anterior completamente
    if (swiperEl.swiper) {
      swiperEl.swiper.destroy(true, true);
    }

    // 2. Configuração
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
      pagination: { clickable: true },
      navigation: true,
      breakpoints: {
        640: { slidesPerView: 1.5, centeredSlides: true },
        768: { slidesPerView: 2, centeredSlides: false },
        1024: { slidesPerView: 3, centeredSlides: false },
      },
    };

    if (this.mobileOnly) {
      config.breakpoints = {
        768: { enabled: false }
      };
    }

    // 3. Aplicar configuração e inicializar com garantia de limpeza
    Object.assign(swiperEl, config);

    // Usar setTimeout para garantir que o stack de execução limpou
    setTimeout(() => {
      swiperEl.initialize();
    }, 50);
  }
}
