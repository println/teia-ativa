import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTES } from '../../config/routes.config';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './services.html',
    styleUrl: './services.scss',
})
export class ServicesComponent {
    routes = ROUTES;
}
