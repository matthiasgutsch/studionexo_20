import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppComponent } from '../../app.component';
import { PagesService } from '../../services/api/pages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  loading: boolean = false;
  element: any;

  blogs: any = [];
  posts: any = [];
  style = 'light white';
  slug: any;
  secondSlug: string = '';
  app = inject(AppComponent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagesService: PagesService,
    private router: Router,
    private metaService: Meta,
    private titleService: Title
  ) {
    pagesService = inject(PagesService);
  }

  ngOnInit(): void {
    this.app.setHeaderStyle('light white');

    this.activatedRoute.paramMap.subscribe((params) => {
      this.pagesService.get_slug('contact').subscribe((item) => {
        this.element = item;

        this.titleService.setTitle(this.element.seo_title);
        this.metaService.updateTag({
          property: 'og:title',
          content: this.element.seo_title,
        });
      });
    });
  }

  options: AnimationOptions = {
    path: '/assets/json/lotti.json',
  };
}
