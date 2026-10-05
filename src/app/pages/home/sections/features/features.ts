import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FEATURES } from '../../../../core/data/features';
import { Icon } from '../../../../shared/components/icon/icon';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-features',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="funciones" aria-labelledby="funciones-title" class="bg-white py-20">
      <div class="container-page">
        <app-section-heading
          headingId="funciones-title"
          eyebrow="Funciones"
          title="Todo lo que necesitas para salir"
          subtitle="Desde encontrar qué hacer hasta entrar al evento con tu QR, en una sola app."
        />

        <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of features; track feature.title) {
            <li class="rounded-2xl bg-surface p-6 ring-1 ring-surface-dim/60">
              <span class="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-white">
                <app-icon [icon]="feature.icon" />
              </span>
              <h3 class="mt-4 text-lg font-semibold text-neutral">{{ feature.title }}</h3>
              <p class="mt-2 leading-relaxed text-muted">{{ feature.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Features {
  protected readonly features = FEATURES;
}
