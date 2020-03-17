import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import {LayoutModule, MediaMatcher} from '@angular/cdk/layout';

const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  mobileQuery: MediaQueryList;
  links = [
    {name:'Invoices' , url: 'invoices'},
    {name:'Clients' , url: 'clients'},
  ]
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 720px)');
    this.mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  private mobileQueryListener: () => void;

  ngOnInit(): void {
  }
  isScreenSmall() {
    return this.mobileQuery.matches;
  }

}
