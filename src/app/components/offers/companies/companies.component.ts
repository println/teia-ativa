import { Component } from '@angular/core';
import { DifferentiatorsComponent } from '../differentiators/differentiators';
import { ComparisonComponent } from '../../proofs/comparison/comparison';


@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [DifferentiatorsComponent, ComparisonComponent],
    templateUrl: './companies.component.html',
    styleUrl: './companies.component.scss'
})
export class CompaniesComponent { }
