import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'teia-ativa-app';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Se não houver fragmento e não for uma navegação interna da segmentação (empresa/escola), rola para o topo
      const url = event.urlAfterRedirects || event.url;
      const isSegmentation = url.includes('/empresa') || url.includes('/escola');
      const hasFragment = url.includes('#');

      if (!isSegmentation && !hasFragment) {
        window.scrollTo(0, 0);
      }
    });
  }
}
