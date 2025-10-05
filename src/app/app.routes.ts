import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: ':slug',
    component: CategoryComponent,
    data: { theme: 'light' },
  },
];
