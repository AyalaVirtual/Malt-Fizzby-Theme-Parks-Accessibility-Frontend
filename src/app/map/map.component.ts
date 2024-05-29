import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit  {
  @Input() center: [any, any] = [0, 0]; // Default center
  @Input() zoom: number = 14; // Default zoom level
  @Input() markers: [any, any][] = []; // Array of marker coordinates

  private map!: L.Map;
  private routingControl: any;

  ngOnInit(): void {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers'] && !changes['markers'].firstChange) {
      this.updateMarkers();
    }

    // EXPERIMENTAL 
    if (changes['center'] && !changes['center'].firstChange) {
      this.map.setView(this.center, this.zoom);
    }
  }
  
  ngAfterViewInit(): void {
    this.updateMarkers();
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }


  private updateMarkers(): void {
    if (this.map) {
      // Clear existing markers
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
      
      const cordinateset = this.markers.slice(4, 14).map(coords => [coords[0], -coords[1]]);
      this.initRouting(cordinateset)
    }
  }

  private initRouting(cordinateset: any[][]): void {
        this.routingControl = L.Routing.control({
        router: L.Routing.osrmv1({
          language: 'en', // This sets the language for OSRM router 
          profile: 'foot-walking' // This sets a custom walking profile
        }),
         collapsible: true,
         plan: L.Routing.plan([
           L.latLng(cordinateset[0][0], cordinateset[0][1]),
           L.latLng(cordinateset[1][0], cordinateset[0][1]),
           L.latLng(cordinateset[2][0], cordinateset[0][1]),
           L.latLng(cordinateset[3][0], cordinateset[0][1]),
           L.latLng(cordinateset[4][0], cordinateset[0][1]),
           L.latLng(cordinateset[5][0], cordinateset[0][1]),
           L.latLng(cordinateset[6][0], cordinateset[0][1]),
           L.latLng(cordinateset[7][0], cordinateset[0][1]),
         ], {
          createMarker: function(i, wp, n) {
            if (i == 0 || i == n - 1) {
              return L.marker(wp.latLng, {
                draggable: false // prevent users from changing waypoint position
              });
            } else {
              return false;
            }
          }
        }),
        addWaypoints: false,
        routeWhileDragging: false
    }).addTo(this.map); 
    this.routingControl.spliceWaypoints(0, 2);
  }

}
