import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { 
    
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }


  getArticles():Observable<any>{
    return this._http.get("https://cors-anywhere.herokuapp.com/http://dev.to/api/articles?per_page=20")
              .pipe(catchError(this.formatErrors));
  }

  getImages(url):Observable<any>{
    return this._http.get(url)
              .pipe(catchError(this.formatErrors));
  }
}
