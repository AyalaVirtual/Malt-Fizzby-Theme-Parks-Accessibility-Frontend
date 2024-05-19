import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ParksComponent } from "./parks.component";
import { ParkAccessibilityComponent } from "../park-accessibility/park-accessibility.component";
import { AttractionsComponent } from "../attractions/attractions.component";
import { AttractionAccessibilityComponent } from "../attraction-accessibility/attraction-accessibility.component";


export const parksRoutes: Routes = [
    // This sets the path to the component 
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
    },
];


@NgModule({
    imports: [RouterModule.forChild(parksRoutes)],
    exports: [RouterModule]
})
export class ParksRoutingModule {}