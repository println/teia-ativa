import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Partners } from '../partners/partners';
import { Carousel } from '../../shared/carousel/carousel';

interface Testimonial {
  name: string;
  initials: string;
  role: string;
  content: string;
  service: string;
  location: string;
  source: string;
  context?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, Carousel],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials implements OnInit {
  private http = inject(HttpClient);
  testimonials: Testimonial[] = [];

  ngOnInit(): void {
    this.http.get<Testimonial[]>('assets/proofs/testimonials.json').subscribe({
      next: (data) => {
        this.testimonials = data;
      },
      error: (err) => {
        console.error('Error loading testimonials:', err);
      }
    });
  }
}
