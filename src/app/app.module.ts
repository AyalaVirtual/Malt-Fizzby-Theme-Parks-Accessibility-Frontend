import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParksComponent } from './parks/parks.component';
import { ParkPreviewComponent } from './park-preview/park-preview.component';
import { ParkAccessibilityComponent } from './park-accessibility/park-accessibility.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { AttractionAccessibilityComponent } from './attraction-accessibility/attraction-accessibility.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarButtonComponent } from './navbar-button/navbar-button.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ParksComponent,
    ParkPreviewComponent,
    ParkAccessibilityComponent,
    AttractionsComponent,
    AttractionAccessibilityComponent,
    NavbarButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
