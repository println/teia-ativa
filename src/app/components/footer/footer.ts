import { Component } from '@angular/core';
import { LogoFullComponent } from "../shared/logo/logo-full.component";
import { CommonModule } from '@angular/common';
import { AppSettings } from '../../config/app.config';
import { ROUTES } from '../../config/routes.config';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LogoFullComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  appSettings = AppSettings;
  routes = ROUTES;
}
