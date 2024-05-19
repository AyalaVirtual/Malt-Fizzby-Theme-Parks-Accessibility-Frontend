import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParksComponent } from './parks/parks.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { ParkAccessibilityComponent } from './park-accessibility/park-accessibility.component';
import { AttractionAccessibilityComponent } from './attraction-accessibility/attraction-accessibility.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'parks',
        pathMatch: 'full',
    },
    {
        path: 'parks',
        component: ParksComponent,
    },
    {
        path: 'parks/:parkId/parkaccessibility/:parkAccessibilityId',
        component: ParkAccessibilityComponent,
    },
    {
        path: 'parks/:parkId/attractions',
        component: AttractionsComponent,
    },
    {
        path: 'parks/:parkId/attractions/:attractionId/attractionaccessibility/:attractionAccessibilityId',
        component: AttractionAccessibilityComponent,
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
