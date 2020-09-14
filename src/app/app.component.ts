import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ShowAuthedDirective } from './show-authed.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private authService: AuthService){
  }
  ngOnInit(){
    this.authService.populateUser();
  }
}
