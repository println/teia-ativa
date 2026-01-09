import { createStore, withProps, select } from '@ngneat/elf';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UiProps {
    isDark: boolean;
}

const store = createStore(
    { name: 'ui' },
    withProps<UiProps>({ isDark: false })
);

@Injectable({ providedIn: 'root' })
export class UiStore {
    isDark$ = store.pipe(select((state) => state.isDark));

    private readonly LIGHT_THEME = 'teia-ativa-original';
    private readonly DARK_THEME = 'teia-ativa-original-dark';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            const isDark = savedTheme === this.DARK_THEME;

            // Sync store with saved preference
            if (isDark) {
                store.update((state) => ({ ...state, isDark: true }));
            }

            // Apply initial theme
            this.applyTheme(isDark ? this.DARK_THEME : this.LIGHT_THEME);
        }
    }

    toggleTheme() {
        if (isPlatformBrowser(this.platformId)) {
            store.update((state) => {
                const newDark = !state.isDark;
                const newTheme = newDark ? this.DARK_THEME : this.LIGHT_THEME;

                this.applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);

                return { ...state, isDark: newDark };
            });
        }
    }

    private applyTheme(theme: string) {
        if (isPlatformBrowser(this.platformId)) {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === this.DARK_THEME) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }
}
