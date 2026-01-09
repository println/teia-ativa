import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UiStore } from '../../../store/ui.store';

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [innerHTML]="svgContent" 
             class="logo-container" 
             [ngClass]="(invertDark && (isDark$ | async)) ? 'light' : variant">
        </div>
    `,
    styles: [`
        .logo-container {
            display: contents;
        }

        .logo-container svg {
            width: 100%;
            height: 100%;
        }

        .logo-container .part-primary {
            fill: #f36928;
        }

        .logo-container .part-secondary {
            fill: #304b2a;
            transition: fill 0.3s ease;
        }

        .logo-container.light .part-secondary {
            fill: #ffffff;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class LogoComponent implements OnInit {
    @Input() variant: 'default' | 'light' = 'default';
    @Input() invertDark = false;

    private http = inject(HttpClient);
    private sanitizer = inject(DomSanitizer);
    private uiStore = inject(UiStore);

    isDark$ = this.uiStore.isDark$;

    svgContent: SafeHtml | null = null;

    ngOnInit() {
        this.http.get('logo-nome.svg', { responseType: 'text' }).subscribe(svg => {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        });
    }
}
