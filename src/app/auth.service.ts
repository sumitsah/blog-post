import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<string>({} as string);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  userName: string;
  constructor(public afAuth: AngularFireAuth,
    private localStrorage: LocalStorageService) { }

  setAuth(userName) {
    this.localStrorage.saveLogedInUser(userName);
    this.currentUserSubject.next(userName);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.localStrorage.destroyUser();
    this.currentUserSubject.next('');
    this.isAuthenticatedSubject.next(false);
  }

  populateUser() {
    if (this.localStrorage.getUser()) {
      this.setAuth(this.localStrorage.getUser());
    } else {
      console.log('No user Found!');
    }
  }
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          console.log(res.user.email.split('@')[0]);
          this.setAuth(res.user.email.split('@')[0]);
        }, err => reject(err));
    })
  }
}
