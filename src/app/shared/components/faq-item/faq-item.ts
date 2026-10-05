import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChevronDown } from 'lucide';

import type { Faq } from '../../../core/models';
import { Icon } from '../icon/icon';

/** Pregunta desplegable con `<details>`: funciona sin JavaScript y con teclado. */
@Component({
  selector: 'app-faq-item',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <details class="group rounded-2xl bg-white ring-1 ring-surface-dim open:shadow-sm">
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left [&::-webkit-details-marker]:hidden"
      >
        <h3 class="text-base font-semibold text-neutral">{{ faq().question }}</h3>
        <app-icon
          [icon]="chevron"
          [size]="20"
          class="text-primary transition-transform group-open:rotate-180"
        />
      </summary>
      <p class="px-5 pb-5 leading-relaxed text-muted">{{ faq().answer }}</p>
    </details>
  `,
})
export class FaqItem {
  readonly faq = input.required<Faq>();
  protected readonly chevron = ChevronDown;
}
