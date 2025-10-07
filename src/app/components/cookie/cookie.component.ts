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
          console.log('Modal pronta:', modalName);
        },
        onModalShow: ({ modalName }) => {
          console.log('Modal visibile:', modalName);
        },
        onModalHide: ({ modalName }) => {
          console.log('Modal nascosta:', modalName);
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
                  console.log('Cookie analitici accettati');
                },
                onReject: () => {
                  console.log('Cookie analitici rifiutati');
                },
              },
            },
          },
        },

        language: {
          default: 'it',
          translations: {
            it: {
              consentModal: {
                title: 'Questo sito utilizza i cookie',
                description: `
                  Questo sito utilizza cookie per raccogliere statistiche d’uso in forma anonima,
                  al fine di migliorare l’esperienza complessiva dell’utente.
                  Se vuoi saperne di più o modificare le tue preferenze,
                  leggi la nostra 
                  <a href="/cookie-policy" target="_blank">Cookie Policy</a> 
                  e la nostra 
                  <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                  Cliccando su "Accetta" presti il consenso all’utilizzo dei cookie.
                `,
                acceptAllBtn: 'Accetta',
                acceptNecessaryBtn: 'Rifiuta',
                showPreferencesBtn: 'Gestisci preferenze',
                footer: `
                  <a href="/cookie-policy" target="_blank">Cookie Policy</a>
                  <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                `,
              },
              preferencesModal: {
                title: 'Gestisci le preferenze sui cookie',
                acceptAllBtn: 'Accetta tutti',
                acceptNecessaryBtn: 'Rifiuta tutti',
                savePreferencesBtn: 'Salva selezione attuale',
                closeIconLabel: 'Chiudi la finestra',
                serviceCounterLabel: 'Servizio|Servizi',
                sections: [
                  {
                    title: 'Cookie strettamente necessari',
                    description:
                      'Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere disattivati.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Cookie di prestazione e analisi',
                    description:
                      'Questi cookie ci aiutano a capire come gli utenti interagiscono con il sito raccogliendo e segnalando informazioni in forma anonima.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      caption: 'Elenco dei cookie',
                      headers: {
                        name: 'Nome',
                        domain: 'Dominio',
                        desc: 'Scopo',
                      },
                      body: [
                        {
                          name: '_ga',
                          domain: hostname,
                          desc: 'Utilizzato per distinguere gli utenti ai fini delle statistiche di Google Analytics.',
                        },
                        {
                          name: '_gid',
                          domain: hostname,
                          desc: 'Utilizzato per distinguere gli utenti (durata breve) per Google Analytics.',
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
