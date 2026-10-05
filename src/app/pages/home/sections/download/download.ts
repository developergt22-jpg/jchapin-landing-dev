import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, Check, Info } from 'lucide';

import { PLAY_STEPS, REQUIREMENTS } from '../../../../core/data/download';
import { ApkButton } from '../../../../shared/components/apk-button/apk-button';
import { ApkDetails } from '../../../../shared/components/apk-details/apk-details';
import { BetaBadge } from '../../../../shared/components/beta-badge/beta-badge';
import { Icon } from '../../../../shared/components/icon/icon';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-download',
  imports: [RouterLink, ApkButton, ApkDetails, BetaBadge, Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="descargar" aria-labelledby="descargar-title" class="bg-primary py-20 text-white">
      <div class="container-page">
        <div class="flex justify-center"><app-beta-badge tone="light" /></div>
        <app-section-heading
          class="mt-4"
          headingId="descargar-title"
          title="Descarga JChapín"
          subtitle="JChapín está en prueba cerrada en Google Play. Pronto estará disponible para todos."
          tone="inverse"
        />

        <div class="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <!-- Google Play -->
          <article
            aria-labelledby="play-title"
            class="rounded-2xl bg-white p-6 text-neutral shadow-xl sm:p-8"
          >
            <p class="text-sm font-semibold text-secondary uppercase">Opción recomendada</p>
            <h3 id="play-title" class="mt-1 text-2xl font-bold">Google Play · prueba cerrada</h3>
            <p class="mt-2 text-muted">Recibes actualizaciones automáticas y la verificación de Google.</p>

            <ol class="mt-6 space-y-5">
              @for (step of playSteps; track step.title; let i = $index) {
                <li class="flex gap-4">
                  <span
                    class="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white"
                    aria-hidden="true"
                  >
                    {{ i + 1 }}
                  </span>
                  <div>
                    <h4 class="font-semibold"><span class="sr-only">Paso {{ i + 1 }}: </span>{{ step.title }}</h4>
                    <p class="mt-1 text-muted">{{ step.description }}</p>
                    @if (step.link) {
                      <a
                        [href]="step.link.url"
                        target="_blank"
                        rel="noopener"
                        class="mt-2 inline-flex items-center gap-1 rounded font-semibold text-secondary hover:underline"
                      >
                        {{ step.link.label }}
                        <app-icon [icon]="arrow" [size]="16" />
                        <span class="sr-only">(se abre en una pestaña nueva)</span>
                      </a>
                    }
                  </div>
                </li>
              }
            </ol>
          </article>

          <!-- APK -->
          <article
            aria-labelledby="apk-title"
            class="flex flex-col rounded-2xl bg-black/15 p-6 ring-1 ring-white/15 sm:p-8"
          >
            <p class="text-sm font-semibold text-secondary-container uppercase">Opción alternativa</p>
            <h3 id="apk-title" class="mt-1 text-2xl font-bold">APK directo</h3>
            <p class="mt-2 text-white/85">
              Instala el archivo sin pasar por la tienda. Útil si aún no tienes acceso a la prueba.
            </p>
            <div class="mt-6"><app-apk-button tone="light" /></div>
            <app-apk-details class="mt-6" tone="light" />
            <a
              routerLink="/descargar"
              class="mt-6 inline-flex items-center gap-1 self-start rounded font-semibold text-secondary-container hover:underline"
            >
              Ver instrucciones de instalación
              <app-icon [icon]="arrow" [size]="16" />
            </a>
          </article>
        </div>

        <div class="mt-6 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
          <h3 class="flex items-center gap-2 font-semibold">
            <app-icon [icon]="info" [size]="20" /> Requisitos
          </h3>
          <ul class="mt-3 grid gap-2 sm:grid-cols-3">
            @for (req of requirements; track req) {
              <li class="flex gap-2 text-white/85">
                <app-icon [icon]="check" [size]="20" class="mt-0.5 text-secondary-container" />
                <span>{{ req }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class Download {
  protected readonly playSteps = PLAY_STEPS;
  protected readonly requirements = REQUIREMENTS;
  protected readonly arrow = ArrowRight;
  protected readonly check = Check;
  protected readonly info = Info;
}
