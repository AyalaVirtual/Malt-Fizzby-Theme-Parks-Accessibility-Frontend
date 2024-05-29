import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() center: [any, any] = [0, 0]; // Default center
  @Input() zoom: number = 14; // Default zoom level
  @Input() markers: [any, any][] = []; // Marker coordinates
  // @Input() markers: {coords: [any, any], name: any}[] = []; // Marker coordinates and names
  marker: any;


  private map!: L.Map;
  private routingControl: any;

 
  ngOnInit(): void {
    this.initMap();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers'] && !changes['markers'].firstChange) {
      this.updateMarkers();
      this.updateRouting();
    }

    if (changes['center'] && !changes['center'].firstChange) {
      this.map.setView(this.center, this.zoom);
    }
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.updateMarkers();
    this.initRouting();
  }


  private updateMarkers(): void {
    if (this.map) {
      // This clears existing markers
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // This adds new markers
      this.markers.forEach(coords => {
        L.marker(coords).addTo(this.map)
          .bindPopup('Location ' + coords)
          .openPopup();

        // EXPERIMENTAL 2 
      // this.markers.forEach(marker => {
      //   L.marker(marker.coords).addTo(this.map)
      //     .bindPopup(marker.name)
      //     .openPopup();
      });
    }
  }


  private initRouting(): void {
    if (this.markers.length > 1) {
       // This initializes routing control to navigate from one point to another 
       const routingOptions: L.Routing.RoutingControlOptions = {

        waypoints: this.markers.map(coords => L.latLng(coords[0], coords[1])), // Another point in Disney World
        routeWhileDragging: true,

        router: L.Routing.osrmv1({
          language: 'en', // This sets the language for OSRM router 
          profile: 'foot-walking' // This sets a custom walking profile
        }),
        plan: L.Routing.plan(this.markers.map(coords => L.latLng(coords[0], coords[1])), {
          createMarker: (i: number, waypoint: L.Routing.Waypoint) => {
            return L.marker(waypoint.latLng, {
             draggable: true
            }).bindPopup('Waypoint ' + (i + 1));
          },
          language: 'en' // This sets the language for plan 
        }),
        showAlternatives: true,
        altLineOptions: {
          styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'blue', opacity: 0.5, weight: 2 }
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 10
        },
      };

      // This creates routing control with options
      this.routingControl = L.Routing.control(routingOptions).addTo(this.map);
    }
  }


  private updateRouting(): void {
    if (this.routingControl) {
      this.routingControl.setWaypoints(this.markers.map(coords => L.latLng(coords[0], coords[1])));
    } else {
      this.initRouting();
    }
  }


  // EXPERIMENTAL 2 
  // private initRouting(): void {
  //   if (this.markers.length > 1) {
  //     const waypoints = this.markers.map(marker => L.latLng(marker.coords[0], marker.coords[1]));

  //     const customPlan = new L.Routing.Plan(waypoints, {
  //       createMarker: (i: number, waypoint: L.Routing.Waypoint) => {
  //         return L.marker(waypoint.latLng).bindPopup(this.markers[i].name);
  //       }
  //     });

  //     this.routingControl = L.Routing.control({
  //       plan: customPlan,
  //       routeWhileDragging: true
  //     }).addTo(this.map);
  //   }
  // }

  // private updateRouting(): void {
  //   if (this.routingControl) {
  //     const waypoints = this.markers.map(marker => L.latLng(marker.coords[0], marker.coords[1]));
  //     this.routingControl.setWaypoints(waypoints);
  //   } else {
  //     this.initRouting();
  //   }
  // }


}
