import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  currentUser: string;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      //  console.log(this.currentUser);
      }
    );
  }

  logout() {
    this.authService.doLogout()
      .then( () => {
        this.authService.purgeAuth();
        this.router.navigateByUrl('/login');
      }).catch(err => console.log(err));
  }

}
