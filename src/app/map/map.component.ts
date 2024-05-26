import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  
  // ** ADD LOGIC TO CHANGE DEFAULT DEPENDING ON PARK ** 
  @Input() center: [number, number] = [28.3852, -81.5639]; // Default to Disney World
  @Input() zoom: number = 14; // Default zoom level
  @Input() markers: [number, number][] = []; // Array of marker coordinates

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
      // Clear existing markers
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Add new markers
      this.markers.forEach(coords => {
        L.marker(coords).addTo(this.map)
          .bindPopup('Marker at ' + coords)
          .openPopup();
      });
    }
  }


  private initRouting(): void {
    if (this.markers.length > 1) {
      // Example route from one point to another 
      this.routingControl = L.Routing.control({
        waypoints: this.markers.map(coords => L.latLng(coords[0], coords[1])), // Another point in Disney World
        routeWhileDragging: true
      }).addTo(this.map);
    }
  }


  private updateRouting(): void {
    if (this.routingControl && this.map) {
      this.map.removeControl(this.routingControl);
      this.initRouting();
    }
  }


}
