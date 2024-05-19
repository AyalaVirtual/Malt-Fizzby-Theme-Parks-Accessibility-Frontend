import { Injectable } from '@angular/core';
// Any time HTTP is used, this must be imported 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Park } from '../parks/parks.component';


// This means the app is already aware of it, so it's already available 
@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  // This variable points to the Spring Boot API's URL and is where the Angular front-end will send HTTP requests to interact with the back-end. 
  private apiUrl : string = 'http://localhost:8080/api';


  constructor(private http : HttpClient) { }
  

  /* 
    This function takes an id parameter of type 'number' and returns an Observable object (which are used to handle asynchronous data streams) that represents the HTTP response from the API. It then sends an HTTP GET request to the specified URL, which includes the id parameter to retrieve the specific park from the API.
  */
  getParkById(parkId : number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/`);
  }


  /* 
    This function takes an id parameter of type 'number' and returns an Observable object (which are used to handle asynchronous data streams) that represents the HTTP response from the API. It then sends an HTTP GET request to the specified URL, which includes the id parameter to retrieve all available attractions for a specific park from the API.
  */
  getAllAttractionsByParkId(parkId : number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/attractions/`);
  }


  getAttractionByParkIdAndId(parkId : number, attractionId : number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/attractions/${attractionId}/`);
  }

}