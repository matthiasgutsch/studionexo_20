import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string): void {
    let canURL = url ?? this.dom.URL;

    try {
      const parsedUrl = new URL(canURL);
      if (parsedUrl.protocol !== 'https:') {
        parsedUrl.protocol = 'https:';
      }
      canURL = parsedUrl.toString();
    } catch (e) {
      // In caso di errore nel parsing dell'URL (es. stringa malformata), fallback su dom.URL in HTTPS
      canURL = this.dom.URL.replace(/^http:/, 'https:');
    }

    const existingLink: HTMLLinkElement | null = this.dom.querySelector(
      'link[rel="canonical"]'
    );
    if (existingLink) {
      existingLink.setAttribute('href', canURL);
      return;
    }

    // Create a new canonical link
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canURL);
    this.dom.head.appendChild(link);
  }
}
