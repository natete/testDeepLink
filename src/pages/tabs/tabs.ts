import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Tabs } from 'ionic-angular';
import { TabProvider } from '../../providers/tab/tab';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  @ViewChild('myTabs') tabRef: Tabs;

  constructor(private tabsProvider: TabProvider) {

  }

  ionViewDidEnter() {
    this.tabsProvider.activeTabObservable.subscribe(index => this.tabRef.select(index));
  }
}
