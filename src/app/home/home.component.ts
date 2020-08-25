import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: any;
  p: number = 1;
  constructor(private apiService: ApiService) { 
  
  }

  ngOnInit() {
    this.apiService.getArticles()
      .subscribe( articles => {
        this.articles = articles;
        console.log(articles);
      });
  }

}
