import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ServicesComponent } from './pages/services/services';
import { CompaniesComponent } from './components/offers/companies/companies.component';
import { EducationComponent } from './components/offers/education/education.component';
import { ROUTES } from './config/routes.config';

export const routes: Routes = [
    {
        path: ROUTES.about.id,
        component: AboutComponent
    },
    {
        path: ROUTES.services.id,
        component: ServicesComponent
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
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

