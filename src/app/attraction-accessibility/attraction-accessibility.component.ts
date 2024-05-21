import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttractionAccessibilityService } from './attraction-accessibility.service';
import { Attraction } from '../attractions/attractions.component';
import { Park } from '../parks/parks.component';


export type AttractionAccessibility = {
  id : number;
  mustTransfer : any;
  transferAssistance : any;
  serviceAnimalRestrictions : any;
  assistiveDevices : any;
  sensoryExperiences : any;
  attraction : Attraction;
}


@Component({
  selector: 'app-attraction-accessibility',
  templateUrl: './attraction-accessibility.component.html',
  styleUrls: ['./attraction-accessibility.component.css']
})
export class AttractionAccessibilityComponent implements OnInit {
  // This declares a property to store an attraction's accessibility details 
  attraction : any;
  attractionAccessibility : any;
  park : any;


  constructor(private attractionAccessibilityService : AttractionAccessibilityService, private route : ActivatedRoute) {}


  ngOnInit() {
    // This extracts attractionId and attractionAccessibilityId from route parameters
    const attractionId = this.route.snapshot.paramMap.get('attractionId')  || '';
    const attractionAccessibilityId = this.route.snapshot.paramMap.get('attractionAccessibilityId') || '';
    
    if (attractionId && attractionAccessibilityId) {
      this.attractionAccessibilityService
        .getAttractionAccessibilityByAttractionIdAndId(+attractionId, +attractionAccessibilityId)
          .subscribe((attractionAccessibility) => {
            this.attractionAccessibility = attractionAccessibility.data;

            // Fetch attraction data
            this.attractionAccessibilityService
              .getParkById(attractionId)
                .subscribe((attraction) => {
                  this.attraction = attraction.data;

                  console.log(attraction);
                  console.log(attractionAccessibility);
                });
          
          });
    }
  }

}
