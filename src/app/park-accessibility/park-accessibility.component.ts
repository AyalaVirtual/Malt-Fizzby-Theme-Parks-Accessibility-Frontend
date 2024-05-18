import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ParkAccessibility } from './park-accessibility.model';
import { ParkAccessibilityService } from './park-accessibility.service';


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
  selector: 'app-park-accessibility',
  templateUrl: './park-accessibility.component.html',
  styleUrls: ['./park-accessibility.component.css']
})
export class ParkAccessibilityComponent implements OnInit {

  parkAccessibility: ParkAccessibility | null = null;

  constructor(private parkAccessibilityService: ParkAccessibilityService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract parkId and parkAccessibilityId from route parameters
    const parkId = this.route.snapshot.paramMap.get('id'  || '');
    const parkAccessibilityId = this.route.snapshot.paramMap.get('parkAccessibilityId');

    if (parkId && parkAccessibilityId) {
      // Fetch accessibility data using service
      this.parkAccessibilityService.getParkAccessibility(parkId, parkAccessibilityId)
        .subscribe((accessibilityData: ParkAccessibility) => {
          this.parkAccessibility = accessibilityData;
        });
    }
  }
}
