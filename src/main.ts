import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@config/app.config';
import { AppComponent } from './app/app';
import { Buffer } from 'buffer';

(window as any).Buffer = Buffer;
(window as any).global = window;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
