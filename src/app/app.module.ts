import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ShowAuthedDirective } from './show-authed.directive';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    HomeComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
      // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }
 //)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
