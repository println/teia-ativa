import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { Segmentation } from '../../components/segmentation/segmentation';
import { Methodology } from '../../components/methodology/methodology';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Authority } from '../../components/authority/authority';
import { Guarantee } from '../../components/guarantee/guarantee';
import { Cta } from '../../components/cta/cta';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    Hero,
    Segmentation,
    Methodology,
    Testimonials,
    Authority,
    Guarantee,
    Cta
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
