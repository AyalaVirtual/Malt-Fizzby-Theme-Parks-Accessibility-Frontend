import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttractionAccessibilityService } from './attraction-accessibility.service';
import { Attraction } from '../attractions/attractions.component';
import { Park } from '../parks/parks.component';
import { AttractionService } from '../attractions/attraction.service';


export type AttractionAccessibility = {
  id: any;
  mustTransfer: {
    mayRemainInWheelchairEcv: boolean;
    mustBeAmbulatory: boolean;
    mustTransferFromWheelchairEcv: boolean;
    mustTransferToWheelchair: boolean;
    mustTransferToWheelchairThenToRide: boolean;
  };
  transferAssistance: {
    loadUnloadAreas: boolean;
    wheelchairAccessVehicles: boolean;
    transferAccessVehicle: boolean;
    transferDevices: boolean;
  };
  serviceAnimalRestrictions: {
    rideRestrictions: boolean;
    boardRestrictions: boolean;
  };
  assistiveDevices: {
    assistiveListening: boolean;
    audioDescription: boolean;
    handheldCaptioning: boolean;
    signLanguage: boolean;
    videoCaptioning: boolean;
  };
  sensoryExperience: {
    scentSmell: boolean;
    lightingEffects: boolean;
    loudNoises: boolean;
    periodsOfDarkness: boolean;
    bumpy: boolean;
    fast: boolean;
    liftsOffGround: boolean;
    wet: boolean;
    elementOfSurprise: string;
    typeOfRestraint: string;
    tripTime: string;
  };
  attraction: Attraction;
};


@Component({
  selector: 'app-attraction-accessibility',
  templateUrl: './attraction-accessibility.component.html',
  styleUrls: ['./attraction-accessibility.component.css']
})
export class AttractionAccessibilityComponent implements OnInit {
  // These are to store an attraction's associated park, a list of attractions, an individual attraction, and an attraction's accessibility details 
  park : any;
  attractions : Attraction[] = [];
  attraction : any;
  attractionAccessibility : any;

  // These are to store an attraction's accessibility details in 2 equal columns 
  displayedAttributes: { key: string, value: any }[] = [];
  displayedAttributesColumn1: { key: string, value: any }[] = [];
  displayedAttributesColumn2: { key: string, value: any }[] = [];


  constructor(private attractionAccessibilityService : AttractionAccessibilityService, private attractionService : AttractionService, private route : ActivatedRoute) {}


  // This method is called when the component is initialized 
  ngOnInit() {
    // This extracts attractionId and attractionAccessibilityId from route parameters
    const attractionId = this.route.snapshot.paramMap.get('attractionId')  || '';
    const attractionAccessibilityId = this.route.snapshot.paramMap.get('attractionAccessibilityId') || '';
    
    if (attractionId && attractionAccessibilityId) {
      // This fetches an attraction's accessibility details 
      this.attractionAccessibilityService
        .getAttractionAccessibilityByAttractionIdAndId(attractionId, attractionAccessibilityId)
          .subscribe((attractionAccessibility) => {
            this.attractionAccessibility = attractionAccessibility.data;
          });


      // This extracts the associated park's ID from route parameters
      const parkId = this.route.snapshot.paramMap.get('parkId') || '';
      // This fetches an attraction's data
      this.attractionService
        .getAttractionByParkIdAndId(parkId, attractionId)
          .subscribe((attraction) => {
            this.attraction = attraction.data;

            // THIS IS HOW TO ACCESS ATTRACTION ACCESSIBILITY EMBEDDED OBJECT ATTRIBUTES 
            console.log(attraction.data.attractionAccessibility.sensoryExperience.elementOfSurprise);

            // This calls the function that adds an attraction's applicable accessibility details to an array to be displayed and splits them into 2 equal columns 
            this.prepareDisplayedAttributes();
          });

    }

  }


  // This adds an attraction's applicable accessibility details to an array to be displayed and splits them into 2 equal columns 
  prepareDisplayedAttributes() {
    const objectAttributes = [
      this.attraction.attractionAccessibility.mustTransfer,
      this.attraction.attractionAccessibility.transferAssistance,
      this.attraction.attractionAccessibility.serviceAnimalRestrictions,
      this.attraction.attractionAccessibility.assistiveDevices,
      this.attraction.attractionAccessibility.sensoryExperience
    ];
    
   
    // This loops through the embedded object attributes of AttractionAccessibility and pushes them to the displayedAttributes array to be displayed if they are a boolean equal to true,or a string  
    for (const object of objectAttributes) {
      for (const key in object) {
        const value = object[key];

        if (typeof value === 'boolean' && value === true) {
          this.displayedAttributes.push({ key: this.splitCamelCase(key), value: 'Yes' });

        } else if (typeof value === 'string' && value.trim() !== '')  {
          this.displayedAttributes.push({ key: this.splitCamelCase(key), value });
        }

        // This splits the attraction's accessibility details into 2 equal columns to be displayed side by side 
        const halfLength = Math.ceil(this.displayedAttributes.length / 2);
        this.displayedAttributesColumn1 = this.displayedAttributes.slice(0, halfLength);
        this.displayedAttributesColumn2 = this.displayedAttributes.slice(halfLength);

      }
    }
  }


  // This formats the names of the embedded object attributes of AttractionAccessibility 
  splitCamelCase(key: string): string {
    return key
      // This adds space between camelCase words
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // This capitalizes the first letter
      .replace(/^./, str => str.toUpperCase());
  }

}
