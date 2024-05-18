import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkAccessibility } from './park-accessibility.model';

@Injectable({
  providedIn: 'root'
})
export class ParkAccessibilityService {

  constructor(private http: HttpClient) { }

  getParkAccessibility(parkId: string, parkAccessibilityId: string): Observable<ParkAccessibility> {
    const url = `http://localhost:8080/api/parks/${parkId}/park-accessibility/${parkAccessibilityId}`;
    return this.http.get<ParkAccessibility>(url);
  }
}
