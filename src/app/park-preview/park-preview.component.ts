import { Component, OnInit, Input, Output } from '@angular/core';
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
  id: any;
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
  park: Park;
}


@Component({
  selector: 'app-park-preview',
  templateUrl: './park-preview.component.html',
  styleUrls: ['./park-preview.component.css']
})
export class ParkPreviewComponent {
  @Input() park: any;
  @Input() parkAccessibility: any;


  constructor(private parkAccessibilityService : ParkAccessibilityService, private route: ActivatedRoute) {}


  getParkAccessibilityByParkIdAndId(parkId: any, parkAccessibilityId : any) {
    this.parkAccessibilityService.getParkAccessibilityByParkIdAndId(parkId, parkAccessibilityId)
      .subscribe((parkAccessibility) => {
        this.parkAccessibility = parkAccessibility.data;
      });
  }

}