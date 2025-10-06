import {
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AppComponent } from '../../app.component';
import { Pages } from '../../models/pages';
import { PagesService } from '../../services/api/pages.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './works.component.html',
})
export class WorksComponent implements OnInit {
  loading: boolean = false;
  replacements: { [key: string]: string } = {};
  blogs: any = [];
  blog_id?: any;
  quote: any;
  categoryNumber: any;
  blog_detail?: any = null;
  massTimingsHtml: any;
  data: any;
  slug: any;
  secondSlug: string = '';
  category: any;
  comuni: any;
  clients: any = [];
  element!: Pages;
  animationPaths!: string[];
  optionsList: AnimationOptions[] = [];
  app = inject(AppComponent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagesService: PagesService,
    private metaService: Meta,
    private http: HttpClient,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    pagesService = inject(PagesService);
  }

  ngOnInit(): void {
    this.app.setHeaderStyle('light white');

    this.activatedRoute.paramMap.subscribe((params) => {
      this.pagesService.get_slug('works').subscribe((item) => {
        this.element = item;

        // SSR-friendly check for browser platform
        if (isPlatformBrowser(this.platformId)) {
          this.animationPaths = [
            '../json/logo.json',
            '../json/lotti2.json',
            '../json/lotti.json',
            '../json/logo2.json',
            '../json/lotti.json',
          ];

          const preloadPromises = this.animationPaths.map((path) =>
            this.http.get(path).toPromise()
          );

          Promise.all(preloadPromises)
            .then((responses) => {
              this.optionsList = responses.map((data) => ({
                animationData: data,
              }));
            })
            .catch((error) =>
              console.error('Error preloading animations:', error)
            );
        }

        this.titleService.setTitle(
          'Digital Studio - ' + this.element.seo_title
        );

        this.metaService.updateTag({
          property: 'description',
          content: this.element?.description ?? '',
        });

        this.metaService.updateTag({
          property: 'og:title',
          content: this.element?.seo_title ?? '',
        });
        this.metaService.updateTag({
          property: 'og:description',
          content: this.element?.description ?? '',
        });
        this.metaService.updateTag({
          property: 'twitter:title',
          content: this.element?.seo_title ?? '',
        });
        this.metaService.updateTag({
          property: 'twitter:description',
          content: this.element?.description ?? '',
        });
      });
    });
  }

  options: AnimationOptions = {
    path: '../json/lotti.json',
  };

  optionsLogo: AnimationOptions = {
    path: '../json/project1.json',
  };

  optionsMain: AnimationOptions = {
    path: '../json/branding.json',
  };
}
