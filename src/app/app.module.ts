import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {createCustomElement} from "@angular/elements";
import {WorldClockComponent} from "./world-clock/world-clock.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WorldClockComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {}

  // ngDoBootstrap() {
  //   const worldClockElement = createCustomElement(WorldClockComponent, { injector: this.injector });
  //   customElements.define('aw-world-clock', worldClockElement);
  // }

}
