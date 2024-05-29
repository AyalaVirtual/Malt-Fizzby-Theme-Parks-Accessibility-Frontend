import { Component, OnInit, Input } from '@angular/core';
import { ParkService } from './park.service';
import {ActivatedRoute } from '@angular/router';
import { ParkAccessibility } from '../park-accessibility/park-accessibility.component';
import { Attraction } from '../attractions/attractions.component';


export type Park = {
  id : any;
  name : String;
  imageUrl : String;
  description : String;
  latitude : number;
  longitude : number;
  parkAccessibility : ParkAccessibility;
  attractions : Attraction[];
}


@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})


export class ParksComponent implements OnInit {
  // These are to store a list of parks, an individual park, and the park's accessibility details
  parks : Park[] = [];
  park : any;
  parkAccessibility: any;
  

  constructor(private parkService : ParkService, private route: ActivatedRoute) {
  }


  // This method is called when the component is initialized 
  ngOnInit(): void {
    this.fetchParks();


    // This extracts the IDs of the park and the park's accessibility information from the URL route parameters 
    let parkId = this.route.snapshot.paramMap.get('parkId') || '';
    let parkAccessibilityId = this.route.snapshot.paramMap.get('parkAccessibilityId') || '';
    
    if (parkId) {
      // This fetches the park's data 
      this.parkService
        .getParkById(parkId)
          .subscribe((park) => {
            this.park = park.data;
          });
    }
  }


  // This gets a list of all available theme parks 
  fetchParks(): void {
    this.parkService
      .getAllParks()
        .subscribe(
          (response : any) => {
            this.parks = response.data;
          }
    )
  }


  // This gets each park's accessibility information by the park's ID and the ID of the park's accessibility information 
  getParkAccessibilityByParkIdAndId(parkId: any, parkAccessibilityId : any) {
    this.parkService
      .getParkAccessibilityByParkIdAndId(parkId, parkAccessibilityId)
        .subscribe((parkAccessibility) => {
          this.parkAccessibility = parkAccessibility.data;
        });
  }

}
