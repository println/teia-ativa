import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CompaniesComponent } from './components/offers/companies/companies.component';
import { EducationComponent } from './components/offers/education/education.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'empresa', component: CompaniesComponent },
            { path: 'escola', component: EducationComponent },
            { path: '', redirectTo: 'empresa', pathMatch: 'full' }
        ]
    }
];
