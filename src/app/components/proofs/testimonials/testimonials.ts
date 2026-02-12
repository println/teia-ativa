import { Component } from '@angular/core';
import { Partners } from '../partners/partners';
import { Carousel } from '../../shared/carousel/carousel';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [Partners, Carousel],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {

}

