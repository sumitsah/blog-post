import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FactScrollerComponent } from './fact-scroller/fact-scroller.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'article', component: FactScrollerComponent},
  { path: 'registration', component: DashboardComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
