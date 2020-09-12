import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';

export interface Blog {
  title?: string;
}
export class FactsDataSource extends DataSource<Blog | undefined> {
  private cachedFacts = Array.from<Blog>({ length: 0 });
  private dataStream = new BehaviorSubject<(Blog | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  constructor(private apiService: ApiService) {
    super();
    // Start with some data.
    this._fetchFactPage();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Blog | undefined)[] | ReadonlyArray<Blog | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = this._getPageForIndex(range.end);

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this._fetchFactPage();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private pageSize = 10;
  private lastPage = 0;

  private _fetchFactPage(): void {
    for (let i = 0; i < this.pageSize; ++i) {
      this.apiService.getArticles().subscribe(res => {
        console.log(res);
        this.cachedFacts = this.cachedFacts.concat(res);
        this.dataStream.next(this.cachedFacts);
      });
    }
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }
}

@Component({
  selector: 'app-fact-scroller',
  templateUrl: './fact-scroller.component.html',
  styleUrls: ['./fact-scroller.component.scss']
})
export class FactScrollerComponent {

  dataSource: FactsDataSource;

  constructor(private apiService: ApiService) {
    this.dataSource = new FactsDataSource(apiService);
  }
}

