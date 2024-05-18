import { Injectable } from '@angular/core';
// Any time HTTP is used, this must be imported 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ParkAccessibility } from '../park-accessibility/park-accessibility.model';



// This means the app is already aware of it, so it's already available 
@Injectable({
  providedIn: 'root'
})
export class ParkService {
     // This variable points to the Spring Boot API's URL and is where the Angular front-end will send HTTP requests to interact with the back-end. 
  private apiUrl : string = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http : HttpClient) { }


  // This sends an HTTP GET request to the API's "/parks" endpoint using the "http" instance and returns the response from the API. 
  getAllParks() {
    return this.http.get(`${this.apiUrl}/parks/`);
  }
  

  /* 
    This function takes an id parameter of type 'number' and returns an Observable object (which are used to handle asynchronous data streams) that represents the HTTP response from the API. It then sends an HTTP GET request to the specified URL, which includes the id parameter to retrieve the specific park from the API.
  */
    getParkById(id : number) : Observable<any> {
      return this.http.get(`${this.apiUrl}/parks/${id}/`);
    }


    getParkAccessibility(parkId: number): Observable<ParkAccessibility> {
      const url = `${this.apiUrl}/parks/${parkId}/parkAccessibility`;
      return this.http.get<ParkAccessibility>(url);
    }

}