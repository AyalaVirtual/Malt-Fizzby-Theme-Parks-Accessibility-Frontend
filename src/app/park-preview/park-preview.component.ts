import { Component, OnInit, Input } from '@angular/core';
import { ParkService } from '../parks/park.service';
import { ParkAccessibilityService } from '../park-accessibility/park-accessibility.service';
import { ActivatedRoute } from '@angular/router';


export type Park = {
  id: number;
  name: String;
  imageUrl: String;
  description: String;
  latitude: number;
  longitude: number;
  parkAccessibility: any;
}


export type ParkAccessibility = {
  // Define the structure of your ParkAccessibility model based on your API response
  id: number;
  rentalLocations: string[];
  wheelchairReplacementLocations: string[];
  breakLocations: string[];
  stationaryBrailleMapLocations: string[];
  signLanguageSchedule: string;
  guestRelationsLocations: string[];
  serviceAnimalRestrictions_Ride: string[];
  serviceAnimalRestrictions_Board: string[];
  serviceAnimalReliefAreas: string[];
  companionRestroomLocations: string[];
  firstAidLocations: string;
}


@Component({
  selector: 'app-park-preview',
  templateUrl: './park-preview.component.html',
  styleUrls: ['./park-preview.component.css']
})
export class ParkPreviewComponent {
  @Input() park: any;
  @Input() parkAccessibility: any;
  

  constructor(private parkService : ParkService, private route: ActivatedRoute) {}


  // get parkAccessibilityId() {
  //   console.log('Park ID:', this.park?.id);
  //   console.log('Park Accessibility ID:', this.parkAccessibility?.id);
  //   return this.park?.id.parkAccessibility?.id;
  // }


  getParkAccessibilityByParkIdAndId(parkId: number, parkAccessibilityId : number) {
    this.parkService.getParkAccessibilityByParkIdAndId(+parkId, +parkAccessibilityId)
      .subscribe((parkAccessibility) => {
        this.parkAccessibility = parkAccessibility.data;
      });
  }

}