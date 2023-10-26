// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//
// import { AppModule } from './app/app.module';
//
// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { WorldClockComponent } from './app/world-clock/world-clock.component';

(async () => {
  const app = await createApplication({
    providers: [
      // for Material
      //provideAnimations(),
    ],
  });

  const worldClockElement = createCustomElement(WorldClockComponent, {
    injector: app.injector,
  });

  customElements.define('aw-world-clock', worldClockElement);
})();
