import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CompaniesComponent } from './components/offers/companies/companies.component';
import { EducationComponent } from './components/offers/education/education.component';
import { GovernmentComponent } from './components/offers/government/government.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'empresa', component: CompaniesComponent },
            { path: 'escola', component: EducationComponent },
            { path: 'governo', component: GovernmentComponent },
            { path: '', redirectTo: 'empresa', pathMatch: 'full' }
        ]
    }
];
