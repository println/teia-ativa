import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor
import { ContentService } from '../../../services/content.service';

interface OfferContent {
    eyebrow: string;
    title: string;
    subtitle: string;
    hero: {
        title: string;
        description: string;
    };
    differentiators: {
        icon: string;
        title: string;
        description: string;
        style?: string; // Optional style if needed, though we seem to infer it or just use generic
    }[];
    comparison: {
        negative: { title: string; items: { title: string; description: string }[] };
        positive: { title: string; items: { title: string; description: string }[] };
        closing: string;
    };
}

@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './companies.component.html',
    styleUrl: './companies.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class CompaniesComponent implements OnInit {

    content?: OfferContent;

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        this.contentService.getContent<OfferContent>('assets/content/oferta-empresa.md')
            .subscribe(data => {
                this.content = data;
            });
    }
}
