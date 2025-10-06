import { Component, OnInit, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { PagesService } from '../../services/api/pages.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [CommonModule, LottieComponent],
})
export class AboutComponent implements OnInit {
  loading: boolean = false;
  element: any;

  blogs: any = [];
  posts: any = [];
  app = inject(AppComponent);
  slug: any;
  secondSlug: string = '';
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
      this.pagesService.get_slug('about').subscribe((item) => {
        this.element = item;

        this.titleService.setTitle(this.element.seo_title);
        this.metaService.updateTag({
          property: 'og:title',
          content: this.element.name,
        });
      });
    });
  }

  options: AnimationOptions = {
    path: '../json/technology_top.json',
  };
}
