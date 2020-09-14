import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authForm: FormGroup;
  authType: string = '';
  title: string = '';
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.authForm = this.fb.group({
      // name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // confirmPassword : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      this.authType = urlSegment[urlSegment.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('name', new FormControl());
        this.authForm.addControl('confirmPassword', new FormControl());
      }
    })
  }

  onSubmit() {
    if (this.authType === 'login') {
      this.authService.doLogin(this.authForm.value)
        .then(res => {
          console.log(res);
          this.router.navigateByUrl('/home');
        }, err => {
          console.log(err);
          // this.errorMessage = err.message;
          // this.successMessage = "";
        })
        .catch(err => console.log(err));
    } else {
      this.authService.doRegister(this.authForm.value)
        .then(res => {
          this.router.navigateByUrl('/login');
        }, err => console.log(err))
    }
  }

  get name() { return this.authForm.get('name'); }
}
