import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttractionAccessibilityService } from './attraction-accessibility.service';
import { Attraction } from '../attractions/attractions.component';
import { Park } from '../parks/parks.component';
import { AttractionService } from '../attractions/attraction.service';


export type AttractionAccessibility = {
  id : any;
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
  attractions : Attraction[] = [];
  attraction : any;
  attractionAccessibility : any;
  park : any;


  constructor(private attractionAccessibilityService : AttractionAccessibilityService, private attractionService : AttractionService, private route : ActivatedRoute) {}


  ngOnInit() {
    // This extracts attractionId and attractionAccessibilityId from route parameters
    const attractionId = this.route.snapshot.paramMap.get('attractionId')  || '';
    const attractionAccessibilityId = this.route.snapshot.paramMap.get('attractionAccessibilityId') || '';
    
    if (attractionId && attractionAccessibilityId) {
      this.attractionAccessibilityService
        .getAttractionAccessibilityByAttractionIdAndId(attractionId, attractionAccessibilityId)
          .subscribe((attractionAccessibility) => {
            this.attractionAccessibility = attractionAccessibility.data;

            // This extracts parkId from route parameters
            const parkId = this.route.snapshot.paramMap.get('parkId') || '';
            // Fetch attraction data
            this.attractionService
              .getAttractionByParkIdAndId(parkId, attractionId)
                .subscribe((attraction) => {
                  this.attraction = attraction.data;

                  console.log(this.park);
                  console.log(this.attraction);
                  console.log(attractionAccessibility);
                });
          
          });
    }
  }

}
