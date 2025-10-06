import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { AboutComponent } from './pages/about/about.component';
import { DetailComponent } from './pages/detail/detail.component';
import { BlogDetailResolver } from './common/blog-detail.resolver';
import { WorksComponent } from './pages/works/works.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { theme: 'light' },
  },

  {
    path: 'about',
    component: AboutComponent,
    data: { theme: 'light' },
  },

  {
    path: 'contact',
    component: ContactComponent,
    data: { theme: 'light' },
  },

  {
    path: 'works',
    component: WorksComponent,
    data: { theme: 'light' },
  },

  {
    path: ':slug',
    component: CategoryComponent,
    data: { theme: 'light' },
  },

  {
    path: ':slug/:slug',
    component: DetailComponent,
    resolve: {
      data: BlogDetailResolver,
    },
    data: { theme: 'light' },
  },
];
