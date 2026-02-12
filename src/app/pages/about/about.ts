import { Component } from '@angular/core';
import { Cta } from '../../components/cta/cta';
import { Authority } from '../../components/proofs/authority/authority';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [Cta, Authority],
    templateUrl: './about.html',
    styleUrl: './about.scss',
})
export class AboutComponent {

}
