import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideServerRendering } from '@angular/platform-server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, {
    ...config,
    providers: [...(config.providers ?? []), provideServerRendering()],
  }, context);

export default bootstrap;
