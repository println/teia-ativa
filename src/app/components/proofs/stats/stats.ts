import { Component } from '@angular/core';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [],
    templateUrl: './stats.html',
    styleUrl: './stats.scss',
})
export class Stats {
    stats = [
        { value: '6.276+', label: 'Quilômetros percorridos' },
        { value: '1.043+', label: 'Pessoas transformadas' },
        { value: '2', label: 'Prêmios' },
        { value: '1+', label: 'Anos de experiência' },
    ];
}
