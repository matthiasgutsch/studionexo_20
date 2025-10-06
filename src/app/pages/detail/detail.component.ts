import {
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../services/api/api.service';
import { CanonicalService } from '../../services/api/canonical.service';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  standalone: true,
  imports: [CommonModule, LottieComponent],
})
export class DetailComponent implements OnInit {
  loading: boolean = false;
  replacements: { [key: string]: string } = {};
  blogs: any = [];
  items: any = [];
  blog_id?: any;
  quote: any;
  categoryNumber: any;
  blog_detail?: any = null;
  replaceDescripion1HtmlOutput: any;
  replaceDescripion2HtmlOutput: any;
  replaceDescripion3HtmlOutput: any;
  replaceTitleOutput: any;
  replaceSeoTitleOutput: any;
  animationPaths!: string[];
  optionsList: AnimationOptions[] = [];
  data: any;
  style = signal('dark black');

  slug: any;
  secondSlug: string = '';
  category: any;
  comuni: any;
  clients: any = [];
  options_top!: AnimationOptions;
  tagsArray: string[] = [];
  app = inject(AppComponent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private metaService: Meta,
    private http: HttpClient,
    private canonicalService: CanonicalService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: object // Inject PLATFORM_ID
  ) {
    api = inject(ApiService);
  }

  ngOnInit(): void {
    this.app.setHeaderStyle('black dark');

    this.activatedRoute.paramMap.subscribe((params) => {
      const urlSegments = this.activatedRoute.snapshot.url.map(
        (segment) => segment.path
      );
      if (urlSegments.length > 1) {
        this.slug = urlSegments[0];
        this.secondSlug = urlSegments[1];
      }

      if (isPlatformBrowser(this.platformId)) {
        this.animationPaths = ['../json/' + this.slug + '_top.json'];

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

      this.loadBlogsList();

      this.api.getBlogDetail(this.secondSlug).subscribe((element) => {
        this.comuni = element;

        if (!element || !element.id) {
          // If response is null or no ID, redirect to home
          this.router.navigate(['/']);
          return;
        }

        this.api.getPostDetail(this.slug).subscribe((element) => {
          this.category = element;

          if (!element || !element.id) {
            // If response is null or no ID, redirect to home
            this.router.navigate(['/']);
            return;
          }
          this.tagsArray = this.category.tags.split(','); // Convert string to array

          this.replaceText();
        });
      });
    });
  }

  async loadBlogsList() {
    this.loading = true;
    this.api
      .getBlogPosts()
      .then((res) => {
        this.loading = false;
        this.clients = res;
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  isBrandingRoute(): boolean {
    return this.router.url.startsWith('/branding/');
  }

  isUxRoute(): boolean {
    return this.router.url.startsWith('/ux-design/');
  }

  isWebDesignRoute(): boolean {
    return this.router.url.startsWith('/webdesign/');
  }

  replaceText() {
    // Set the dynamic replacements
    this.replacements = {
      location: this.comuni.name,
      service: this.category.name,
    };

    // Helper function to replace placeholders
    const replacePlaceholders = (template: string): string => {
      return template
        .replace(/\[location\]/g, this.replacements['location'])
        .replace(/\[service\]/g, this.replacements['service']);
    };

    // Replace placeholders in all templates
    const replacedTemplates = {
      description1: replacePlaceholders(this.category.replace_description_1),
      description2: replacePlaceholders(this.category.replace_description_2),
      description3: replacePlaceholders(this.category.replace_description_3),
      title: replacePlaceholders(this.category.replace_title),
      replace_seo_title: replacePlaceholders(this.category.replace_seo_title),
    };

    // Sanitize the dynamically generated HTML
    this.replaceDescripion1HtmlOutput = this.sanitizer.bypassSecurityTrustHtml(
      replacedTemplates.description1
    );
    this.replaceDescripion2HtmlOutput = this.sanitizer.bypassSecurityTrustHtml(
      replacedTemplates.description2
    );
    this.replaceDescripion3HtmlOutput = this.sanitizer.bypassSecurityTrustHtml(
      replacedTemplates.description3
    );
    this.replaceTitleOutput = this.sanitizer.bypassSecurityTrustHtml(
      replacedTemplates.title
    );

    this.replaceSeoTitleOutput = this.sanitizer.bypassSecurityTrustHtml(
      replacedTemplates.replace_seo_title
    );

    // Set page title and metadata
    this.titleService.setTitle(replacedTemplates.replace_seo_title);

    this.metaService.updateTag({
      property: 'og:title',
      content: replacedTemplates.replace_seo_title,
    });
    this.metaService.updateTag({
      name: 'description',
      content: replacedTemplates.description2,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: replacedTemplates.description2,
    });

    this.canonicalService.setCanonicalURL();
  }

  getInnerHTMLValue() {
    return this.sanitizer.bypassSecurityTrustHtml(this.data.html);
  }
}
