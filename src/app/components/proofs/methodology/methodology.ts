import { Component } from '@angular/core';
import { UiSection, UiSectionBackgroundDirective, UiSectionHeaderDirective } from "@app/components/shared/ui-section/ui-section";

@Component({
  selector: 'app-methodology',
  imports: [UiSectionBackgroundDirective, UiSectionHeaderDirective, UiSection],
  templateUrl: './methodology.html',
  styleUrl: './methodology.scss',
})
export class Methodology {

}
