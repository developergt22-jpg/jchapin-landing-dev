import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EVENT_LIFECYCLE } from '../../../../core/data/flow';
import { Icon } from '../../../../shared/components/icon/icon';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

/** Línea de tiempo en HTML/CSS (texto indexable y accesible, sin imágenes). */
@Component({
  selector: 'app-event-flow',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="flujo" aria-labelledby="flujo-title" class="bg-surface py-20">
      <div class="container-page">
        <app-section-heading
          headingId="flujo-title"
          eyebrow="Ciclo de un evento"
          title="Así viaja un evento dentro de JChapín"
          subtitle="Desde que el organizador lo crea hasta que los asistentes dejan su reseña."
        />

        <ol class="relative mx-auto mt-12 max-w-3xl">
          @for (step of steps; track step.title; let i = $index; let last = $last) {
            <li class="relative flex gap-5 pb-8 last:pb-0">
              @if (!last) {
                <span class="absolute top-12 bottom-0 left-6 w-0.5 -translate-x-1/2 bg-primary/20" aria-hidden="true"></span>
              }
              <span
                class="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white ring-4 ring-surface"
              >
                @if (step.icon) {
                  <app-icon [icon]="step.icon" [size]="22" />
                }
              </span>
              <div class="flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-surface-dim/60">
                <p class="text-sm font-semibold text-secondary">Paso {{ i + 1 }}</p>
                <h3 class="mt-1 text-lg font-semibold text-neutral">{{ step.title }}</h3>
                <p class="mt-1 leading-relaxed text-muted">{{ step.description }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class EventFlow {
  protected readonly steps = EVENT_LIFECYCLE;
}
