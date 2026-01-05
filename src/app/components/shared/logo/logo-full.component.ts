import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-logo-full',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [innerHTML]="svgContent" class="logo-container" [ngClass]="variant"></div>
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
export class LogoFullComponent implements OnInit {
    @Input() variant: 'default' | 'light' = 'default';

    private http = inject(HttpClient);
    private sanitizer = inject(DomSanitizer);

    svgContent: SafeHtml | null = null;

    ngOnInit() {
        this.http.get('logo-full.svg', { responseType: 'text' }).subscribe(svg => {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        });
    }
}
