import { Component, ElementRef, ViewChild, AfterViewInit, AfterContentInit, Input, OnDestroy, ChangeDetectorRef, NgZone, HostListener, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements AfterViewInit, AfterContentInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;
  @ContentChildren('carouselItem', { descendants: true }) items?: QueryList<any>;

  @Input() itemWidth: number = 350; // largura padrão de cada item
  @Input() gap: number = 32; // gap padrão entre items (8 * 4 = 32px para gap-8)

  currentIndex = 0;
  totalItemsCount = 0;
  visibleItems = 1;
  totalPages = 1;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  private resizeObserver?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateCarouselMetrics();
  }

  ngAfterContentInit() {
    this.updateItemsCount();
    this.items?.changes.subscribe(() => {
      this.updateItemsCount();
      this.updateCarouselMetrics();
    });
  }

  ngAfterViewInit() {
    // Pequeno timeout para garantir que o DOM renderizou e tem dimensões
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.updateCarouselMetrics();
          this.setupResizeObserver();
        });
      }, 300);
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private updateItemsCount() {
    if (this.items && this.items.length > 0) {
      this.totalItemsCount = this.items.length;
    } else if (this.carouselContainer) {
      this.totalItemsCount = this.carouselContainer.nativeElement.children.length;
    }
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => {
        this.updateCarouselMetrics();
      });
    });
    if (this.carouselContainer) {
      this.resizeObserver.observe(this.carouselContainer.nativeElement);

      // Adicionar listener de scroll para atualizar pontos em tempo real
      this.carouselContainer.nativeElement.addEventListener('scroll', () => {
        if (!this.isDragging) { // Durante o drag, nós mesmos controlamos a atualização
          this.ngZone.run(() => {
            this.updateCurrentIndexFromScroll(false);
          });
        }
      }, { passive: true });
    }
  }

  private updateCarouselMetrics() {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const containerWidth = container.offsetWidth;

      if (containerWidth === 0) return;

      this.updateItemsCount();

      // Calcular quantos itens são visíveis por vez
      this.visibleItems = Math.floor((containerWidth + this.gap) / (this.itemWidth + this.gap));
      if (this.visibleItems < 1) this.visibleItems = 1;

      // Calcular total de páginas (granular: item por item)
      this.totalPages = Math.max(1, this.totalItemsCount - this.visibleItems + 1);

      // Ajustar currentIndex se estiver fora do range
      if (this.currentIndex >= this.totalPages) {
        this.currentIndex = Math.max(0, this.totalPages - 1);
      }

      this.cdr.detectChanges();
    }
  }

  get indicators(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.totalPages - 1;
  }

  get canGoPrev(): boolean {
    return this.currentIndex > 0;
  }

  next() {
    if (this.canGoNext) {
      this.currentIndex++;
      this.scrollToIndex(this.currentIndex);
    }
  }

  prev() {
    if (this.canGoPrev) {
      this.currentIndex--;
      this.scrollToIndex(this.currentIndex);
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.scrollToIndex(index);
  }

  private scrollToIndex(index: number) {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      // Scroll agora é item por item
      const scrollPosition = index * (this.itemWidth + this.gap);
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  // Drag handlers
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.carouselContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.carouselContainer.nativeElement.scrollLeft;
    // Desativar scroll suave temporariamente durante o drag manual para maior precisão
    this.carouselContainer.nativeElement.style.scrollBehavior = 'auto';
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.carouselContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.carouselContainer.nativeElement.scrollLeft = this.scrollLeft - walk;

    // Atualizar indicadores em tempo real durante o movimento
    this.updateCurrentIndexFromScroll(false);
  }

  onMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.carouselContainer.nativeElement.style.scrollBehavior = 'smooth';
    // Faz o snap (ajuste) para o item mais próximo ao soltar
    this.snapToNearestPage();
  }

  onMouseLeave() {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  // Touch handlers
  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.carouselContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.carouselContainer.nativeElement.scrollLeft;
    this.carouselContainer.nativeElement.style.scrollBehavior = 'auto';
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX - this.carouselContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.carouselContainer.nativeElement.scrollLeft = this.scrollLeft - walk;

    this.updateCurrentIndexFromScroll(false);
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.carouselContainer.nativeElement.style.scrollBehavior = 'smooth';
    this.snapToNearestPage();
  }

  private snapToNearestPage() {
    this.updateCurrentIndexFromScroll(true);
    this.scrollToIndex(this.currentIndex);
  }

  private updateCurrentIndexFromScroll(isFinal: boolean = false) {
    if (this.carouselContainer) {
      const container = this.carouselContainer.nativeElement;
      const scrollPosition = container.scrollLeft;

      // Cálculo por item individual (index representa o primeiro item à esquerda)
      const itemStep = this.itemWidth + this.gap;
      const newIndex = Math.round(scrollPosition / itemStep);

      const safeIndex = Math.max(0, Math.min(newIndex, this.totalPages - 1));

      if (this.currentIndex !== safeIndex) {
        this.currentIndex = safeIndex;
        this.cdr.detectChanges();
      }
    }
  }
}
