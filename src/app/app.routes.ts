import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ServicesComponent } from './pages/services/services';
import { CompaniesComponent } from './components/offers/companies/companies.component';
import { EducationComponent } from './components/offers/education/education.component';
import { GovernmentComponent } from './components/offers/government/government.component';
import { ROUTES } from './config/routes.config';
import { NAMES } from '@config/names.config';

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
        path: ROUTES.home.id,
        redirectTo: NAMES.BASIC_PAGES.empty,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: ROUTES.organization.id, component: CompaniesComponent },
            { path: ROUTES.education.id, component: EducationComponent },
            { path: ROUTES.public_management.id, component: GovernmentComponent },
            { path: '', redirectTo: ROUTES.organization.id, pathMatch: 'full' }
        ]
    }
];

