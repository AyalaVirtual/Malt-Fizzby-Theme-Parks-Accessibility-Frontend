import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkAccessibilityService } from './park-accessibility.service';
import { Park } from '../parks/parks.component';


export type ParkAccessibility = {
  id : any;
  rentalLocations : string[];
  wheelchairReplacementLocations : string[];
  breakLocations : string[];
  stationaryBrailleMapLocations : string[];
  signLanguageSchedule : string;
  guestRelationsLocations : string[];
  serviceAnimalRestrictions_Ride : string[];
  serviceAnimalRestrictions_Board : string[];
  serviceAnimalReliefAreas : string[];
  companionRestroomLocations : string[];
  firstAidLocations : string;
  park : Park;
}

@Component({
  selector: 'app-park-accessibility',
  templateUrl: './park-accessibility.component.html',
  styleUrls: ['./park-accessibility.component.css']
})
export class ParkAccessibilityComponent implements OnInit {
  park : any;
  parkAccessibility : any;


  constructor(private parkAccessibilityService : ParkAccessibilityService, private route : ActivatedRoute) {}


  ngOnInit() {
    // This extracts parkId and parkAccessibilityId from route parameters
    const parkId = this.route.snapshot.paramMap.get('parkId') || '';
    const parkAccessibilityId = this.route.snapshot.paramMap.get('parkAccessibilityId') || '';

    if (parkId && parkAccessibilityId) {
      this.parkAccessibilityService
        .getParkAccessibilityByParkIdAndId(parkId, parkAccessibilityId)
          .subscribe((parkAccessibility) => {
            this.parkAccessibility = parkAccessibility.data;

            // Fetch park data
            this.parkAccessibilityService
              .getParkById(parkId)
                .subscribe((park) => {
                  this.park = park.data;

                  console.log(park);
                  console.log(parkAccessibility);
                });
            
          });
    }
  }
  
}
