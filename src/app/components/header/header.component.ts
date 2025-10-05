import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule, RouterModule, OverlayMenuComponent]
})
export class HeaderComponent {
  @Input() classes: 'light white' | 'black dark' = 'black dark';

  blogs: any[] = [];
  posts: any[] = [];
}
