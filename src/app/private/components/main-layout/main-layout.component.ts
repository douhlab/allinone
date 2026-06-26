import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, startWith, Subscription} from 'rxjs';

interface PageTitleInfo {
  layoutTitle: string;
  documentTitle: string;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isSidebarOpen = false;
  pageTitle = '';
  private titleSub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.titleSub = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.getActivePageTitle())
    ).subscribe(({layoutTitle, documentTitle}) => {
      this.pageTitle = layoutTitle;
      this.title.setTitle(documentTitle ? `${documentTitle} | My Lab` : 'My Lab');
    });
  }

  ngOnDestroy(): void {
    this.titleSub?.unsubscribe();
  }

  onMenuToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private getActivePageTitle(): PageTitleInfo {
    let child = this.route.firstChild;

    while (child?.firstChild) {
      child = child.firstChild;
    }

    const data = child?.snapshot.data ?? {};
    const title = data['title'] as string | undefined;

    if (!title) {
      return {layoutTitle: '', documentTitle: ''};
    }

    if (data['skipLayoutTitle']) {
      return {layoutTitle: '', documentTitle: title};
    }

    return {layoutTitle: title, documentTitle: title};
  }
}
