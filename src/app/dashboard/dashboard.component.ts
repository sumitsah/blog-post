import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.authForm = this.fb.group({
      'name': ['', Validators.required],
      'email' : ['', Validators.required],
      'password' : ['', Validators.required],
      'confirmPassword' : ['', Validators.required]
    });
  }
  

  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.authForm.value);
  }
}
