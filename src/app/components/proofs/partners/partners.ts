import { Component } from '@angular/core';

@Component({
    selector: 'app-partners',
    standalone: true,
    imports: [],
    templateUrl: './partners.html',
    styleUrl: './partners.scss',
})
export class Partners {
    logos = [
        { src: 'images/logos/sebrae.svg', alt: 'SEBRAE' },
        { src: 'images/logos/sanar.svg', alt: 'SENAR' },
        { src: 'images/logos/ibam.svg', alt: 'IBAM' },
        { src: 'images/logos/sesc.svg', alt: 'SESC' },
    ];

    // Duplicamos para o efeito de ticker infinito
    displayLogos = [...this.logos, ...this.logos];
}
