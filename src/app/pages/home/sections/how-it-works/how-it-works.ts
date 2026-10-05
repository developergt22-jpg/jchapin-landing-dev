import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ATTENDEE_STEPS } from '../../../../core/data/flow';
import { Icon } from '../../../../shared/components/icon/icon';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-how-it-works',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="como-funciona" aria-labelledby="como-funciona-title" class="bg-surface py-20">
      <div class="container-page">
        <app-section-heading
          headingId="como-funciona-title"
          eyebrow="Cómo funciona"
          title="De la idea a la entrada, en seis pasos"
          subtitle="Así se vive un evento con JChapín si vas como asistente."
        />

        <ol class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (step of steps; track step.title; let i = $index) {
            <li class="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface-dim/60">
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-base font-bold text-neutral"
                  aria-hidden="true"
                >
                  {{ i + 1 }}
                </span>
                @if (step.icon) {
                  <app-icon [icon]="step.icon" class="text-primary" />
                }
                <h3 class="text-lg font-semibold text-neutral">
                  <span class="sr-only">Paso {{ i + 1 }}: </span>{{ step.title }}
                </h3>
              </div>
              <p class="mt-3 leading-relaxed text-muted">{{ step.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class HowItWorks {
  protected readonly steps = ATTENDEE_STEPS;
}
