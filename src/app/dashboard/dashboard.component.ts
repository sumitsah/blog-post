import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  authForm: FormGroup;
  constructor(private fb: FormBuilder,
              private localstorage: LocalStorageService) { 
   
  }
  

  ngOnInit(): void {
     this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.authForm.value);
    if(typeof(Storage) !== "undefined"){
      localStorage.setItem('FormValue', JSON.stringify(this.authForm.value));
    }else{
      console.log('not saved!');
    }
  }

  get name() { return this.authForm.get('name'); }
}
