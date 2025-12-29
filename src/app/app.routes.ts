import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Dream } from './components/dream/dream';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'empresa', component: Dream, data: { type: 'empresa' } },
            { path: 'escola', component: Dream, data: { type: 'escola' } },
            { path: 'governo', component: Dream, data: { type: 'governo' } },
            { path: '', redirectTo: 'empresa', pathMatch: 'full' }
        ]
    }
];
