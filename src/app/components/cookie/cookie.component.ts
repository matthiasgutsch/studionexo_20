import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'cookie-consent-component',
  imports: [],
  templateUrl: './cookie.component.html',
})
export class CookieConsentComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = window.location.hostname;
      const { run } = await import('vanilla-cookieconsent');

      run({
        onFirstConsent: ({ cookie }) => {
          console.log('onFirstConsent fired', cookie);
        },
        onConsent: ({ cookie }) => {
          console.log('onConsent fired!', cookie);
        },
        onChange: ({ changedCategories, changedServices }) => {
          console.log('onChange fired!', changedCategories, changedServices);
        },
        onModalReady: ({ modalName }) => {
          console.log('Modal ready:', modalName);
        },
        onModalShow: ({ modalName }) => {
          console.log('Modal visible:', modalName);
        },
        onModalHide: ({ modalName }) => {
          console.log('Modal hidden:', modalName);
        },

        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {
            autoClear: {
              cookies: [{ name: /^_ga/ }, { name: '_gid' }],
            },
            services: {
              googleAnalytics: {
                label: 'Google Analytics',
                onAccept: () => {
                  console.log('Analytics cookies accepted');
                },
                onReject: () => {
                  console.log('Analytics cookies rejected');
                },
              },
            },
          },
        },

        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'We use cookies',
                description: `
                  This website uses cookies to collect anonymized usage statistics 
                  so that we can improve the overall user experience.
                  If you want to know more or change your preferences, 
                  please read our 
                  <a href="/cookie-policy" target="_blank">Cookie Policy</a> 
                  and 
                  <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                  By clicking "Accept" you are giving consent to the use of cookies.
                `,
                acceptAllBtn: 'Accept',
                acceptNecessaryBtn: 'Reject',
                showPreferencesBtn: 'Manage preferences',
                footer: `
                  <a href="/cookie-policy" target="_blank">Cookie Policy</a>
                  <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                `,
              },
              preferencesModal: {
                title: 'Manage cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Save current selection',
                closeIconLabel: 'Close modal',
                serviceCounterLabel: 'Service|Services',
                sections: [
                  {
                    title: 'Strictly necessary cookies',
                    description:
                      'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Performance and analytics cookies',
                    description:
                      'These cookies help us understand how users interact with our site by collecting and reporting information anonymously.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      caption: 'Cookie list',
                      headers: {
                        name: 'Name',
                        domain: 'Domain',
                        desc: 'Purpose',
                      },
                      body: [
                        {
                          name: '_ga',
                          domain: hostname,
                          desc: 'Used to distinguish users for Google Analytics.',
                        },
                        {
                          name: '_gid',
                          domain: hostname,
                          desc: 'Used to distinguish users for Google Analytics (short-term).',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      });
    }
  }
}
