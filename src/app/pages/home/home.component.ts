import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CategoryService } from '../../services/api/categories.service';
import { PagesService } from '../../services/api/pages.service';
import { AppComponent } from '../../app.component';
import { Pages } from '../../models/pages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, LottieComponent],
})
export class HomeComponent implements OnInit {
  loading = true;
  optionsList: AnimationOptions[] = [];
  animationPaths: string[] = [];
  items: any[] = [];
  posts: any[] = [];
  element?: Pages; // 👈 opzionale per sicurezza
  app = inject(AppComponent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagesService: PagesService,
    private titleService: Title,
    private metaService: Meta,
    private categoryService: CategoryService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.app.setHeaderStyle('light white');

    this.activatedRoute.paramMap.subscribe(() => {
      this.pagesService.get_slug('home').subscribe((item) => {
        this.element = item;

        if (isPlatformBrowser(this.platformId)) {
          this.animationPaths = [
            '../json/project1.json',
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
              this.loading = false;
            })
            .catch((error) => {
              console.error('Error preloading animations:', error);
              this.loading = false;
            });
        }

        this.titleService.setTitle(
          'Digital Studio - ' + (this.element?.seo_title ?? '')
        );
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
}
