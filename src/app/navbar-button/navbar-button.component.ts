import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Park } from '../parks/parks.component';
import { ParkService } from '../parks/park.service';


@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css']
})
export class NavbarButtonComponent implements OnInit {
  parkId: any | null;
  // This is for the 'View Attractions' button icon image 
  imgUrl: string = '';
  park : any;


  constructor(private route: ActivatedRoute, private parkService : ParkService) {}

  
  ngOnInit() {
    // Extract parkId from the current route
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      const parkId = this.route.snapshot.paramMap.get('parkId') || '';

      if (params.has('parkId')) {
        this.parkId = (params.get('parkId'));

        // Fetch park data
        this.parkService
        .getParkById(parkId)
          .subscribe((park) => {
            this.park = park.data;

            this.setButtonImage();
          });
      }
    });
  }


  // This sets the icon image on the 'View Attractions' button depending on the park's name 
  setButtonImage(): void {
    if (this.park) {
      switch (this.park.name) {
        case 'Enchanted Realm':
          this.imgUrl = '../assets/images/magic-kingdom-icon.png';
          break;
        case 'Expedition Isle':
          this.imgUrl = '../assets/images/hollywood-studios-icon.png';
          break;
        case 'Mystical Forest':
          this.imgUrl = '../assets/images/animal-kingdom-icon.png';
          break;
        case 'Fantasy Galaxy':
          this.imgUrl = '../assets/images/epcot-icon.png';
          break;
        default:
          this.imgUrl = '../assets/images/magic-kingdom-icon.png';
          break;
      }
    }
  }


}
