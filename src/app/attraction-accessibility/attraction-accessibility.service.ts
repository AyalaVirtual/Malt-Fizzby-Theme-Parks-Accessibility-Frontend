import { Injectable } from '@angular/core';
// Any time HTTP is used, this must be imported 
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AttractionAccessibility } from './attraction-accessibility.component';
import { switchMap } from 'rxjs/operators';
import { ParamMap } from '@angular/router';
import { EMPTY } from 'rxjs'; // Import EMPTY observable


// This means the app is already aware of it, so it's already available 
@Injectable({
  providedIn: 'root'
})
export class AttractionAccessibilityService {
  // This variable points to the Spring Boot API's URL and is where the Angular front-end will send HTTP requests to interact with the back-end. 
  private apiUrl : string = 'http://localhost:8080/api';


  constructor(private http : HttpClient, private route: ActivatedRoute) { }


  /* 
    This function takes an id parameter of type 'number' and returns an Observable object (which are used to handle asynchronous data streams) that represents the HTTP response from the API. It then sends an HTTP GET request to the specified URL, which includes the id parameter to retrieve the specific park from the API.
  */
  getParkById(parkId : any) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/`);
  }


  getAttractionByParkIdAndId(parkId : any, attractionId : any) : Observable<any> {
    return this.http.get(`${this.apiUrl}/parks/${parkId}/attractions/${attractionId}/`);
  }


  getAttractionAccessibilityByAttractionIdAndId(attractionId : any, attractionAccessibilityId : any) : Observable<any> {
    return this.route.paramMap.pipe(
      switchMap((params : ParamMap) => {
        const parkId = params.get('parkId');
        if (parkId) {
          return this.http.get(`${this.apiUrl}/parks/${parkId}/attractions/${attractionId}/attractionaccessibility/${attractionAccessibilityId}/`);
        } else {
          return EMPTY; // Return EMPTY observable if parkId is not found
        }
      })
    );
  }

}