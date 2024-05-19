import { Component, OnInit, Input } from '@angular/core';
import { ParkService } from './park.service';
import {ActivatedRoute } from '@angular/router';
import { ParkAccessibility } from '../park-accessibility/park-accessibility.component';


export type Park = {
  id : number;
  name : String;
  imageUrl : String;
  description : String;
  latitude : number;
  longitude : number;
  parkAccessibility : ParkAccessibility;
}


@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})


export class ParksComponent implements OnInit {
  // This declares a property to store parks 
  parks : Park[] = [];
  park : any;
  parkAccessibility: ParkAccessibility | null = null; 
  

  constructor(private parkService : ParkService, private route: ActivatedRoute) {}


  // This method is called when the component is initialized. Within this method, the fetchParks() function is called to retrieve the parks. 
  ngOnInit(): void {
    this.fetchParks();


  /*
    This retrieves the ID from the URL route parameters using the "snapshot" of the ActivatedRoute service. It then checks if the ID is not empty. If it is not empty, it calls the getParkById() method of the park service, passing the ID as a parameter. This method returns an observable that emits the park data. It then uses the "subscribe" method on the observable to handle the emitted park data and stores it in the "park" property of the component.
  */
    let id = this.route.snapshot.paramMap.get('id') || '';
    
    if (id) {
      this.parkService.getParkById(+id)
        .subscribe((park) => {
          this.park = park.data;
      });
  }
}

  /* 
    This method fetches the parks by calling the getAllParks() function from the park service.  This returns an observable that the .subscribe() method is used to subscribe to so that when a response is received, the parks property of the component is assigned the data retrieved from the response. As a result, whenever a new park is created, the list of parks is updated.
  */
  fetchParks(): void {
    this.parkService.getAllParks().subscribe(
      (response : any) => {
        this.parks = response.data;
      }
    )
  }


  getParkAccessibilityByParkIdAndId(parkId: number, parkAccessibilityId : number) {
    this.parkService.getParkAccessibilityByParkIdAndId(+parkId, +parkAccessibilityId)
      .subscribe((parkAccessibility) => {
        this.parkAccessibility = parkAccessibility.data;
      });
  }

}
