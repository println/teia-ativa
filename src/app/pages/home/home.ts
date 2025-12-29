import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { Segmentation } from '../../components/offers/segmentation/segmentation';
import { Methodology } from '../../components/proofs/methodology/methodology';
import { Testimonials } from '../../components/proofs/testimonials/testimonials';
import { Authority } from '../../components/proofs/authority/authority';
import { Guarantee } from '../../components/proofs/guarantee/guarantee';
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
