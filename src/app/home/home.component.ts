import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { mergeMap, delay, map, tap, pluck, filter } from 'rxjs/operators';
import { ArticleListConfig } from '../models/article-list-config.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageToShow = [];
  articles: any;
  p: number = 1;
  listConfig: ArticleListConfig = { type: 'all' };
  isImageLoading: boolean;
  artObj = [];
  images;

  constructor(private router: Router,
    private apiService: ApiService) { 
  }

  ngOnInit() {
    this.isImageLoading = true;
     this.apiService.getArticles()
        .pipe(
          // Getting all the articles in stream and mapping obj 
          map( article =>{
         return article.map( (a : any) =>  {
            let obj = {}
            obj['userName'] = a.user.name
            obj['publishDate'] = a.readable_publish_date
            obj['title'] = a.title
            obj['description'] = a.description
            obj['image'] = a.social_image
            obj['tagList'] = a.tag_list

            return obj;
           })
          }), 
          // filtering all the images from modifiedArt and creating images from blob 
          map( modifiedArt =>{ 
              this.artObj = modifiedArt;
              return modifiedArt.map( art => 
                {
                  this.apiService.getImages(art.image)
                    .subscribe( images => {
                      this.images = images; 
                      console.log(this.images);
                      this.articles = this.artObj;
                      this.createImageFromBlob(images);          
                    })                
                })
          })
        )
        .subscribe(() => this.isImageLoading = false );
  }

  setListTo(type: string){
    if(type === 'feed'){
      this.router.navigateByUrl('/registration');
      return; 
    }
    this.listConfig = {type: type};
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow.push(reader.result);
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
