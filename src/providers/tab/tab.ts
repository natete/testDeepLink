import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the TabProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TabProvider {

  private activeTab = new BehaviorSubject<number>(null);

  get activeTabObservable(): Observable<number> { return this.activeTab.asObservable(); }

  constructor() { }

  navigateToTab(tab: number) {
    this.activeTab.next(tab);
  }
}
