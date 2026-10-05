import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FAQS } from '../../../../core/data/faq';
import { FaqItem } from '../../../../shared/components/faq-item/faq-item';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-faq',
  imports: [FaqItem, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="preguntas" aria-labelledby="preguntas-title" class="bg-surface py-20">
      <div class="container-page">
        <app-section-heading headingId="preguntas-title" eyebrow="Preguntas frecuentes" title="¿Tienes dudas?" />
        <div class="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          @for (faq of faqs; track faq.question) {
            <app-faq-item [faq]="faq" />
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected readonly faqs = FAQS;
}
