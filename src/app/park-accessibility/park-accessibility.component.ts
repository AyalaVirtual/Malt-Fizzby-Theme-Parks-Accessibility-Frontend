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
  // These are to store an individual park and the park's accessibility details
  park : any;
  parkAccessibility : any;

  // This is to store the src URL for the header image 
  imgUrl: string = '';

  // These are for the map 
  center: [any, any] = [0, 0]; // Default coordinates
  markers: [any, any][] = [];
  disneyLat : any = 28.3852;
  disneyLong : any = -81.5639;


  constructor(private parkAccessibilityService : ParkAccessibilityService, private route : ActivatedRoute) {}


  // This method is called when the component is initialized  
  ngOnInit() {
    // This extracts associated park's ID and the ID of the park's accessibility information from route parameters
    const parkId = this.route.snapshot.paramMap.get('parkId') || '';
    const parkAccessibilityId = this.route.snapshot.paramMap.get('parkAccessibilityId') || '';

    if (parkId && parkAccessibilityId) {
      // This fetches a specific park's accessibility information 
      this.parkAccessibilityService
        .getParkAccessibilityByParkIdAndId(parkId, parkAccessibilityId)
          .subscribe((parkAccessibility) => {
            this.parkAccessibility = parkAccessibility.data;

            // This fetches a park's data
            this.parkAccessibilityService
              .getParkById(parkId)
                .subscribe((park) => {
                  this.park = park.data;

                  // This calls the function that changes the background image for the header by setting the image's src URL 
                  this.setBackgroundImage();

                  // This stores a park's accessibility details 
                  const parkAccessibility = park.data.parkAccessibility;

                  // This stores the first aid locations in an array 
                  const firstAidLocationsArray : string[] = parkAccessibility.firstAidLocations.split(',');
                  // This stores the scheduled days that sign language is available in an array 
                  const signLanguageScheduleArray : string[] = parkAccessibility.signLanguageSchedule.split(',');

                  // This calls the function to change the map displayed so it matches the park that the user selected from the homepage 
                  this.setMapData();
                });
            
          });
    }

  }


  // This sets the src URL for the header image depending on the selected park's name 
  setBackgroundImage(): void {
    if (this.park) {
      switch (this.park.name) {
        case 'Enchanted Realm':
          this.imgUrl = "https://th.bing.com/th/id/OIG2..Mq0VFpGOEXttRpEZtk5?w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn";
          break;
        case 'Tinseltown Studios':
          // this.imgUrl = 'https://drive.google.com/thumbnail?id=1MoaHCsZyckQzSYRdYTNwRCGfhkq1MDu_&sz=w1000';
          // this.imgUrl = 'https://drive.google.com/thumbnail?id=1OSuewth-qOnsI-GcsTDI_esQk_RtlMnD&sz=w1000';
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1WPN36mhTUUk0ZszAb4DK29tfcIKcteGT&sz=w1000';
          break;
        case 'Expedition Isle':
          this.imgUrl = 'https://drive.google.com/thumbnail?id=1cHXfvAN8HS4NQZVnTFeUquxcvugK6GWx&sz=w1000';
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


  // This changes the map that will be displayed depending on which park the user has selected from the homepage 
  setMapData(): void {
    if (this.park) {
      this.center = [this.park.latitude, this.park.longitude];
      this.markers = [[this.park.latitude, this.park.longitude]];
    }
  }


}
