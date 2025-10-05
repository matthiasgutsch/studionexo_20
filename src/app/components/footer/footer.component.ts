import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieConsentComponent } from '../cookie/cookie.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, CookieConsentComponent],
})
export class FooterComponent {
  @Input() classes: 'light white' | 'black dark' = 'black dark';
  loading = false;
}
