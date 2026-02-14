import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from '../app.routes';
import suzanProfile from '../../../public/assets/profiles/profile_suzan.json';
import robertoProfile from '../../../public/assets/profiles/profile_roberto.json';
import sabrinaProfile from '../../../public/assets/profiles/profile_sabrina.json';


// Placeholder for routes if not yet fully implemented
// const routes: any[] = [];

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'disabled'
        })),
        provideHttpClient()
    ]
};

export interface AppConfig {
    storeName: string;
    contact: {
        whatsapp: string;
        email: string;
    };
    contacts: {
        name: string;
        whatsapp: string;
        email: string;
        image: string;
    }[];
    social: {
        instagram?: string;
        threads?: string;
        facebook?: string;
        youtube?: string;
        telegram?: string;
        tiktok?: string;
        linkedin?: string;
    };
    features: {
        theme: {
            default: string;
            available: string[];
        };
    };
    // Adicione outras seções conforme necessário
}

export const AppSettings: AppConfig = {
    storeName: 'Teia Ativa',
    contact: {
        whatsapp: '5521999999999',
        email: 'contato@teiaativa.com.br'
    },
    contacts: [
        {
            name: suzanProfile.name,
            whatsapp: suzanProfile.whatsapp,
            email: suzanProfile.email,
            image: suzanProfile.image
        },
        {
            name: robertoProfile.name,
            whatsapp: robertoProfile.whatsapp,
            email: robertoProfile.email,
            image: robertoProfile.image
        },
        {
            name: sabrinaProfile.name,
            whatsapp: sabrinaProfile.whatsapp,
            email: sabrinaProfile.email,
            image: sabrinaProfile.image
        },
    ],
    social: {
        instagram: 'https://www.instagram.com/teia.ativa/',
        facebook: 'https://www.facebook.com/teia.ativa/',
        tiktok: 'https://www.tiktok.com/@teia.ativa',
        linkedin: 'https://www.linkedin.com/in/teia-ativa-b911b73a9'
    },
    features: {
        theme: {
            default: 'teia-ativa-original',
            available: [
                'teia-ativa-original',
                'teia-ativa-original-dark',
            ]
        }
    },
};
