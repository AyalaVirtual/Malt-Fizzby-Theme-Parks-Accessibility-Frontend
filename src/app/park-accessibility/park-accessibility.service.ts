import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkAccessibilityService {
  // This variable points to the Spring Boot API's URL and is where the Angular front-end will send HTTP requests to interact with the back-end 
  private apiUrl : string = 'http://localhost:8080/api';


  constructor(private http : HttpClient) { }


  /* 
    This function takes an id parameter of type 'number' and returns an Observable object (which are used to handle asynchronous data streams) that represents the HTTP response from the API. It then sends an HTTP GET request to the specified URL, which includes the id parameter to retrieve the specific park from the API.
  */
  getParkById(parkId: any) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/`);
  }


  getParkAccessibilityByParkIdAndId(parkId: any, parkAccessibilityId: any) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/parkaccessibility/${parkAccessibilityId}/`);
  }
  
}
