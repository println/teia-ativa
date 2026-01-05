import { Component } from '@angular/core';
import { LogoFullComponent } from "../shared/logo/logo-full.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LogoFullComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
