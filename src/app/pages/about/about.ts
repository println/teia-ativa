import { Component } from '@angular/core';
import { Cta } from '../../components/cta/cta';
import { Authority } from '../../components/proofs/authority/authority';
import { UiSection, UiSectionBackgroundDirective, UiSectionHeaderDirective } from '../../components/shared/ui-section/ui-section';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [Cta, Authority, UiSection, UiSectionHeaderDirective, UiSectionBackgroundDirective],
    templateUrl: './about.html',
    styleUrl: './about.scss',
})
export class AboutComponent {

}
