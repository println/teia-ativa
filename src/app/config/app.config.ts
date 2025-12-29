import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

// Placeholder for routes if not yet fully implemented
// const routes: any[] = [];

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes)
    ]
};

export interface AppConfig {
    storeName: string;
    contact: {
        whatsapp: string;
        email: string;
    };
    social: {
        instagram?: string;
        threads?: string;
        facebook?: string;
        youtube?: string;
        telegram?: string;
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
    storeName: 'Minha Loja',
    contact: {
        whatsapp: '5521999999999',
        email: 'contato@exemplo.com'
    },
    social: {
        instagram: 'https://instagram.com/',
        facebook: 'https://facebook.com/'
    },
    features: {
        theme: {
            default: 'chocolate',
            available: [
                'mariam-gourmet',
                'mariam-gourmet-dark',
                'chocolate',
                'abyss', 'acid', 'aqua', 'autumn', 'black', 'bumblebee', 'business', 'caramellatte', 'cmyk', 'coffee', 'corporate', 'cupcake', 'cyberpunk', 'dark', 'dim', 'dracula', 'emerald', 'fantasy', 'forest', 'garden', 'halloween', 'lemonade', 'light', 'lofi', 'luxury', 'night', 'nord', 'pastel', 'retro', 'silk', 'sunset', 'synthwave', 'valentine', 'winter', 'wireframe'
            ]
        }
    },
};
