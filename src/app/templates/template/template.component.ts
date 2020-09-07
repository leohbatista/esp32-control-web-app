import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

enum LinkType {
  'external',
  'route'
}

interface NavItem {
  text: string;
  link: string;
  linkType: LinkType;
  icon: string;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {

  fillerNav: NavItem[] = [
    {
      text: 'LED',
      link: '/led',
      linkType: LinkType.route,
      icon: 'emoji_objects',
    },
    {
      text: 'Temperatura e Umidade',
      link: '/dht',
      linkType: LinkType.route,
      icon: 'ac_unit',
    },
  ];

  loading = false;
  layoutMatches = false;

  isOpened = false;

  layoutSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.layoutSubscription = breakpointObserver.observe('(max-width: 768px)').subscribe(result => {
      this.layoutMatches = result.matches;
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.layoutSubscription) { this.layoutSubscription.unsubscribe(); }
  }
}
