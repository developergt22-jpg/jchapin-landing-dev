import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShieldCheck } from 'lucide';

import { APP } from '../../core/config/app-links';
import { APK_INSTALL_STEPS, REQUIREMENTS } from '../../core/data/download';
import { ApkButton } from '../../shared/components/apk-button/apk-button';
import { ApkDetails } from '../../shared/components/apk-details/apk-details';
import { BetaBadge } from '../../shared/components/beta-badge/beta-badge';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-download-page',
  imports: [RouterLink, ApkButton, ApkDetails, BetaBadge, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface py-14 sm:py-20">
      <div class="container-page">
        <app-beta-badge />
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance text-neutral sm:text-5xl">
          Descargar JChapín para Android
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Mientras la app está en prueba cerrada, puedes instalarla con el APK oficial. Sigue estos pasos.
        </p>

        <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface-dim/60 sm:p-8">
            <app-apk-button />
            <app-apk-details class="mt-6" />

            <div class="mt-6 flex gap-3 rounded-xl bg-secondary-container/30 p-4 text-sm text-neutral">
              <app-icon [icon]="shield" class="text-secondary" />
              <p>
                <strong>Descarga JChapín solo desde este sitio o Google Play.</strong>
                Si quieres verificar el archivo en una computadora, compara su huella con el SHA-256 de
                arriba: <code class="rounded bg-white px-1 font-mono text-xs">shasum -a 256 {{ fileName }}</code>
              </p>
            </div>
          </div>

          <section aria-labelledby="pasos-title">
            <h2 id="pasos-title" class="text-2xl font-semibold text-neutral">Cómo instalar el APK</h2>
            <ol class="mt-6 space-y-4">
              @for (step of steps; track step.title; let i = $index) {
                <li class="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-surface-dim/60">
                  <span
                    class="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white"
                    aria-hidden="true"
                  >
                    {{ i + 1 }}
                  </span>
                  <div>
                    <h3 class="font-semibold text-neutral"><span class="sr-only">Paso {{ i + 1 }}: </span>{{ step.title }}</h3>
                    <p class="mt-1 leading-relaxed text-muted">{{ step.description }}</p>
                  </div>
                </li>
              }
            </ol>

            <h2 class="mt-10 text-2xl font-semibold text-neutral">Requisitos</h2>
            <ul class="mt-4 list-disc space-y-1 pl-6 text-muted">
              @for (req of requirements; track req) {
                <li>{{ req }}</li>
              }
            </ul>

            <p class="mt-8 text-muted">
              ¿Prefieres Google Play?
              <a routerLink="/" fragment="descargar" class="font-semibold text-secondary underline underline-offset-2">
                Únete a la prueba cerrada
              </a>
              y recibe las actualizaciones automáticamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  `,
})
export default class DownloadPage {
  protected readonly steps = APK_INSTALL_STEPS;
  protected readonly requirements = REQUIREMENTS;
  protected readonly shield = ShieldCheck;
  protected readonly fileName = APP.apk.url.split('/').pop();
}
