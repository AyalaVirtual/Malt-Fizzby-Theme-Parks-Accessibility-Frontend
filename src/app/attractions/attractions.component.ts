import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Park } from '../parks/parks.component';
import { AttractionAccessibility } from '../attraction-accessibility/attraction-accessibility.component';
import { AttractionService } from "./attraction.service";
import * as L from 'leaflet';
import 'leaflet-routing-machine';


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
  // These are to store a list of attractions, an individual attraction, an attraction's accessibility details, and an attraction's associated park 
  attractions : Attraction[] = [];
  attraction : any;
  attractionAccessibility: any;
  park : any;

  private map : any;
  // These are for the map 
  center: [any, any] = [0, 0]; // Default coordinates
  markers: [any, any][] = [];
  // markers: { coords: [any, any]; name: any }[] = [];
  disneyLat : any = 28.3852;
  disneyLong : any = -81.5639;


  constructor(private attractionService : AttractionService, private route : ActivatedRoute) {}


  // This method is called when the component is initialized  
  ngOnInit() {
    // This extracts the park's ID from the URL route parameters 
    const parkId = this.route.snapshot.paramMap.get('parkId')  || '';

    // This calls the function that fetches a park's list of attractions by the park's ID 
    this.fetchAttractions(parkId);

    if (parkId) {
      // This fetches a list of all available attractions in a specific park  
      this.attractionService
        .getAllAttractionsByParkId(parkId)
          .subscribe((attractions) => {
            this.attractions = attractions.data;

            // This fetches the park's data
            this.attractionService
              .getParkById(parkId)
                .subscribe((park) => {
                  this.park = park.data;

                  // This calls the function to change the map displayed so it matches the park that the user selected from the homepage 
                  this.setMapData();

                  this.initMap();
                  this.addAttractionsToMap();
                  this.calculateShortestRoute();
               });

          });
    }
  }


  // FOR ROUTE CALCULATION 
  // This initiates the map 
  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0], // Initial coordinates (example)
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);
  }


  // This gets a list of all available attractions in a specific park by the park's ID 
  fetchAttractions(parkId : any) : void {
    this.attractionService
      .getAllAttractionsByParkId(parkId)
        .subscribe((response : any) => {
          this.attractions = response.data;

          // ROUTE CALCULATION 
          this.initMap();
          this.addAttractionsToMap();
          this.calculateShortestRoute();
        });
  }


  // FOR ROUTE CALCULATION 
  // This adds all the attractions to the map 
  private addAttractionsToMap(): void {
    this.attractions.forEach(attraction => {
      L.marker([attraction.latitude, attraction.longitude])
        .addTo(this.map)
        .bindPopup(attraction.name as string)
        .openPopup();

        // EXPERIMENTAL: This is supposed to add popups for each attraction with their name and coordinates to the map 
      // this.markers.push({
      //   coords: [attraction.latitude, attraction.longitude],
      //   name: attraction.name
      // });

        // EXPERIMENTAL: This is supposed to instantiate an image overlay object given the URL of the image and the geographical bounds it is tied to 
        L.imageOverlay(this.attraction.imageUrl, [this.attraction.latitude, this.attraction.longitude]).addTo(this.map);
    });
  }

  // This calculates the shortest route between 2 attractions 
  private calculateShortestRoute(): void {
    const waypoints = this.attractions.map(attraction => L.latLng(attraction.latitude, attraction.longitude));

    const customPlan = new L.Routing.Plan(waypoints, {
      createMarker: (i: number, waypoint: L.Routing.Waypoint, n: number) => {
        return L.marker(waypoint.latLng).bindPopup(this.attractions[i].name as string);
      }
    });

    L.Routing.control({
      plan: customPlan,
      routeWhileDragging: true
    }).addTo(this.map);
  }


  // This gets each attraction by its associated park's ID and the attraction's ID
  getAttractionByParkIdAndId(parkId : any, attractionId : any) {
    this.attractionService
        .getAttractionByParkIdAndId(parkId, attractionId)
          .subscribe((attraction) => {
            this.attraction = attraction.data;
          });
  }


  // This gets each attraction's accessibility details by the attraction's ID and the ID of the attraction's accessibility information 
  getAttractionAccessibilityByAttractionIdAndId(attractionId : any, attractionAccessibilityId : any) {
    this.attractionService
        .getAttractionAccessibilityByAttractionIdAndId(attractionId, attractionAccessibilityId)
          .subscribe((attractionAccessibility) => {
            this.attractionAccessibility = attractionAccessibility.data;
          });
  }
    

  // This changes the map that will be displayed depending on which park the user has selected from the homepage 
  setMapData(): void {
    if (this.park) {
      this.center = [this.park.latitude, this.park.longitude];
      this.markers = [[this.park.latitude, this.park.longitude]];
      // this.markers = [[this.park.latitude, this.park.longitude], this.attraction.name];
      this.attractions.forEach(attraction => {
        this.markers.push([attraction.latitude, attraction.longitude]);
        // this.markers.push({
        //   coords: [attraction.latitude, attraction.longitude],
        //   name: this.attraction?.name
        // });
      });
    }
  }
  

}
