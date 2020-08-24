import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
     HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }
 )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
