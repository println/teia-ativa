import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTES } from '../../config/routes.config';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './services.html',
    styleUrl: './services.scss',
})
export class ServicesComponent {
    routes = ROUTES;
}
