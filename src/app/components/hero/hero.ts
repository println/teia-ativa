import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes.config';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  routes = ROUTES;
}
