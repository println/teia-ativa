import { Component } from '@angular/core';
import { Partners } from '../partners/partners';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [Partners],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {

}
