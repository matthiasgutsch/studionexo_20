import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'cookie-consent-component',
  standalone: true,
  imports: [],
  templateUrl: './cookie.component.html',
})
export class CookieConsentComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = window.location.hostname;

      // 👇 Importa solo lato browser
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
          console.log('ready:', modalName);
        },
        onModalShow: ({ modalName }) => {
          console.log('visible:', modalName);
        },
        onModalHide: ({ modalName }) => {
          console.log('hidden:', modalName);
        },

        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: {
            autoClear: {
              cookies: [{ name: /^_ga/ }, { name: '_gid' }],
            },
            services: {
              ga: {
                label: 'Google Analytics (dummy)',
                onAccept: () => {},
                onReject: () => {},
              },
              youtube: {
                label: 'Youtube Embed (dummy)',
                onAccept: () => {},
                onReject: () => {},
              },
            },
          },
          ads: {},
        },

        language: {
          default: 'it',
          translations: {
            it: {
              consentModal: {
                title: 'Questo sito web utilizza i cookie',
                description:
                  'Questo sito web utilizza i cookie per migliorare la tua esperienza di navigazione. Utilizzando il nostro sito web acconsenti a tutti i cookie in conformità con la nostra policy.',
                acceptAllBtn: 'Accetta tutti',
                acceptNecessaryBtn: 'Rifiuta',
                showPreferencesBtn: 'Gestisci i cookie',
                footer: `
                  <a href="/contact" target="_blank">Impressum</a>
                  <a href="/contact" target="_blank">Privacy Policy</a>
                `,
              },
              preferencesModal: {
                title: 'Manage cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Accept current selection',
                closeIconLabel: 'Close modal',
                serviceCounterLabel: 'Service|Services',
                sections: [
                  {
                    title: 'Performance and Analytics',
                    description:
                      'These cookies collect information about how you use our website. Tutti i dati sono anonimizzati.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      caption: 'Cookie table',
                      headers: {
                        name: 'Cookie',
                        domain: 'Domain',
                        desc: 'Description',
                      },
                      body: [
                        {
                          name: '_ga',
                          domain: hostname,
                          desc: 'Description 1',
                        },
                        {
                          name: '_gid',
                          domain: hostname,
                          desc: 'Description 2',
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
