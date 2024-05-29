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

  // This is for the header image 
  imgUrl: string = '';

  // These are for the map 
  center: [any, any] = [0, 0]; // Default coordinates
  markers: [any, any][] = [];
  disneyLat : any = 28.3852;
  disneyLong : any = -81.5639;


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

                  this.setBackgroundImage();

                  const parkAccessibility = park.data.parkAccessibility;

                  const firstAidLocationsArray : string[] = parkAccessibility.firstAidLocations.split(',');
                  const signLanguageScheduleArray : string[] = parkAccessibility.signLanguageSchedule.split(',');

                  this.setMapData();
                });
            
          });
    }

  }


  // This sets the header image depending on the park's name 
  setBackgroundImage(): void {
    if (this.park) {
      switch (this.park.name) {
        case 'Enchanted Realm':
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1yNwfgmo7WQ4Z9znTldkFu-NKJbBhUPPk&sz=w1000';
          break;
        case 'Expedition Isle':
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1cHXfvAN8HS4NQZVnTFeUquxcvugK6GWx&sz=w1000';
          break;
        case 'Mystical Forest':
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1E36CrmW3crHFxS6xVaF-qwausGTKYqkP&sz=w1000';
          break;
        case 'Fantasy Galaxy':
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1n06t4Tn28lZC23lBUoQWTXlMspJFO4_G&sz=w1000';
          break;
        default:
          this.imgUrl = 'https://drive.google.com/thumbnail?id=10umzjm8eA58DERZZL6zMzfzleGrUQRiy&sz=w1000';
          break;
      }
    }
  }


  setMapData(): void {
    if (this.park) {
      this.center = [this.park.latitude, this.park.longitude];
      this.markers = [[this.park.latitude, this.park.longitude]];
    }
  }


}
