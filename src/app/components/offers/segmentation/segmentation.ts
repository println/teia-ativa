import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '@app/config/routes.config';

@Component({
  selector: 'app-segmentation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './segmentation.html',
  styleUrl: './segmentation.scss',
})
export class Segmentation {
  protected readonly ROUTES = ROUTES;
}
