import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Park } from '../parks/parks.component';
import { AttractionAccessibility } from '../attraction-accessibility/attraction-accessibility.component';
import { AttractionService } from "./attraction.service";


export type Attraction = {
  id : any;
  name : String;
  imageUrl : String;
  description : String;
  latitude : number;
  longitude : number;
  park : Park;
  attractionAccessibility : AttractionAccessibility;
}


@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  // This declares a property to store a park's accessibility details 
  attractions : Attraction[] = [];
  attraction : any;
  attractionAccessibility: any;
  park : any;

  // These are for the map 
  center: [any, any] = [0, 0]; // Default coordinates
  markers: [any, any][] = [];
  disneyLat : any = 28.3852;
  disneyLong : any = -81.5639;


  constructor(private attractionService : AttractionService, private route : ActivatedRoute) {}


  ngOnInit() {
    /*
      This retrieves the ID from the URL route parameters using the "snapshot" of the ActivatedRoute service. It then checks if the ID is not empty. If it is not empty, it calls the getAllAttractionsByParkId() method of the attraction service, passing the ID as a parameter. This method returns an observable that emits the attraction data. It then uses the "subscribe" method on the observable to handle the emitted attraction data and stores it in the "attraction" property of the component.
    */
    const parkId = this.route.snapshot.paramMap.get('parkId')  || '';

    this.fetchAttractions(parkId);


    if (parkId) {
      this.attractionService.
        getAllAttractionsByParkId(parkId)
          .subscribe((attractions) => {
            this.attractions = attractions.data;

            // Fetch park data
            this.attractionService
              .getParkById(parkId).subscribe((park) => {
                this.park = park.data;
  
                this.setMapData();
              });

          });
    }
  }


  /* 
    This method fetches the attractions by calling the getAllAttractionsByParkId() function from the attraction service.  This returns an observable that the .subscribe() method is used to subscribe to so that when a response is received, the attractions property of the component is assigned the data retrieved from the response.
  */
  fetchAttractions(parkId : any) : void {
    this.attractionService
      .getAllAttractionsByParkId(parkId)
        .subscribe((response : any) => {
          this.attractions = response.data;
        });
  }


  getAttractionByParkIdAndId(parkId : any, attractionId : any) {
    this.attractionService
        .getAttractionByParkIdAndId(parkId, attractionId)
          .subscribe((attraction) => {
            this.attraction = attraction.data;
          });
  }


  getAttractionAccessibilityByAttractionIdAndId(attractionId : any, attractionAccessibilityId : any) {
    this.attractionService
        .getAttractionAccessibilityByAttractionIdAndId(attractionId, attractionAccessibilityId)
          .subscribe((attractionAccessibility) => {
            this.attractionAccessibility = attractionAccessibility.data;
          });
  }
    

  setMapData(): void {
    if (this.park) {
      this.center = [this.park.latitude, this.park.longitude];
      this.markers = [[this.park.latitude, this.park.longitude]];
      this.attractions.forEach(attraction => {
        this.markers.push([attraction.latitude, attraction.longitude]);
      });
    }
  }
  

}
