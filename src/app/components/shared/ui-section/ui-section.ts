import { CommonModule } from '@angular/common';
import { Component, contentChild, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Directive({
    selector: '[header]',
    standalone: true,
})
export class UiSectionHeaderDirective { }

@Directive({
    selector: '[background]',
    standalone: true,
})
export class UiSectionBackgroundDirective { }

@Component({
    selector: 'app-ui-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ui-section.html',
    styleUrl: './ui-section.scss',
    encapsulation: ViewEncapsulation.Emulated,
})
export class UiSection {

    header = contentChild(UiSectionHeaderDirective, {
        read: ElementRef,
        descendants: true
    });

    @Input() flushMobile = false;

    @Input() sectionClass = '';
}
