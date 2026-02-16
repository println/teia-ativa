import { Component } from '@angular/core';
import { UiSection } from '../../shared/ui-section/ui-section';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [UiSection],
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
