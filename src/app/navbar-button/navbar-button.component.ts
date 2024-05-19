import { Component } from '@angular/core';
import { Park } from '../parks/parks.component';


@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css']
})
export class NavbarButtonComponent {
  park : any;

}
