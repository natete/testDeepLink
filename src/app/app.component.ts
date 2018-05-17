import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Deeplinks } from '@ionic-native/deeplinks';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabProvider } from '../providers/tab/tab';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private deeplinks: Deeplinks,
              private tabProvider: TabProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.deeplinks.route({
        '/about/:id': AboutPage,
        '/contact': ContactPage,
      }).subscribe(
        match => {
          console.log(JSON.stringify(match));
          if (match.$link.path.startsWith('/about')) {
            this.tabProvider.navigateToTab(1);
          }
          else if (match.$link.path.startsWith('/contact')) {
            this.tabProvider.navigateToTab(2);
          }

        },
        noMatch => console.error(JSON.stringify(noMatch))
      );
    });
  }
}
