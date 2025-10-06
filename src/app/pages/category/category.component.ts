import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { CategoryService } from '../../services/api/categories.service';
import { CanonicalService } from '../../services/api/canonical.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [CommonModule, LottieComponent],
})
export class CategoryComponent implements OnInit {
  loading: boolean = false;
  element: any;

  blogs: any = [];
  posts: any = [];
  slug: any;
  secondSlug: string = '';
  options!: AnimationOptions;
  options_top!: AnimationOptions;
  tagsArray: string[] = [];
  cleanDescription_1!: string;
  app = inject(AppComponent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private canonicalService: CanonicalService,
    private metaService: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    categoryService = inject(CategoryService);
  }

  ngOnInit(): void {
    this.app.setHeaderStyle('light white');

    this.activatedRoute.paramMap.subscribe((params) => {
      const slug = this.activatedRoute.snapshot.paramMap.get('slug');

      this.categoryService.get_slug(slug).subscribe((item) => {
        if (!item) {
          console.error('Error: API response is null or undefined');
          return;
        }

        this.element = item;

        this.tagsArray = this.element.tags ? this.element.tags.split(',') : [];

        this.cleanDescription_1 = this.element.description_1
          ? this.element.description_1.replace(/<\/?p>/g, '')
          : '';

        this.titleService.setTitle(this.element.seo_title || '');
        this.metaService.updateTag({
          name: 'description',
          content: this.cleanDescription_1,
        });

        this.metaService.updateTag({
          property: 'og:title',
          content: this.element.seo_title || '',
        });

        this.metaService.updateTag({
          property: 'og:description',
          content: this.cleanDescription_1,
        });

        this.options_top = {
          path: '../json/' + (this.element.slug || '') + '_top.json',
        };

        this.options = {
          path: '../json/' + (this.element.slug || '') + '.json',
        };

        this.canonicalService.setCanonicalURL();
      });
    });
  }

  options_logo: AnimationOptions = {
    path: '../json/logo.json',
  };
}
