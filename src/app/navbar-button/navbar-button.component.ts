import { Component, OnInit } from '@angular/core';
import { Park } from '../parks/parks.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css']
})
export class NavbarButtonComponent  {
  park : any;
  parkId: any | null;


  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    // Extract parkId from the current route
    this.route.paramMap.subscribe(params => {

      console.log(params);
      if (params.has('parkId')) {
        this.parkId = (params.get('parkId'));
      }
    });
  }

}
