import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from '../app.routes';

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
            name: 'Suzan Costa',
            whatsapp: '5521977442014',
            email: 'contato@teiaativa.com.br',
            image: 'images/profiles/profile-suzan.png'
        },
        {
            name: 'Roberto Marinho',
            whatsapp: '5521975317968',
            email: 'contato@teiaativa.com.br',
            image: 'images/profiles/profile-roberto.jpg'
        },
        {
            name: 'Sabrina Mesquita',
            whatsapp: '5522998260246',
            email: 'contato@teiaativa.com.br',
            image: 'images/profiles/profile-sabrina.jpg'
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
