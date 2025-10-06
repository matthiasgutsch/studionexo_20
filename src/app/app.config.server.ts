import { provideServerRendering } from '@angular/ssr';
import { ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

export const config: ApplicationConfig = {
  ...appConfig,
  providers: [...(appConfig.providers ?? []), provideServerRendering()],
};
