import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTES } from '../../config/routes.config';
import { RouterLink } from "@angular/router";
import { UiSection, UiSectionBackgroundDirective, UiSectionHeaderDirective } from '../../components/shared/ui-section/ui-section';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, RouterLink, UiSection, UiSectionHeaderDirective, UiSectionBackgroundDirective],
    templateUrl: './services.html',
    styleUrl: './services.scss',
})
export class ServicesComponent {
    routes = ROUTES;
}
