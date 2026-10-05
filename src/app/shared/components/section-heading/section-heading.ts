import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Encabezado de sección. El `headingId` lo usa la `<section aria-labelledby>` que lo contiene. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block max-w-2xl',
    '[class.mx-auto]': 'align() === "center"',
    '[class.text-center]': 'align() === "center"',
  },
  template: `
    @if (eyebrow()) {
      <p
        class="mb-2 text-sm font-semibold tracking-wide uppercase"
        [class.text-secondary]="tone() === 'default'"
        [class.text-secondary-container]="tone() === 'inverse'"
      >
        {{ eyebrow() }}
      </p>
    }
    <h2
      [id]="headingId()"
      class="text-3xl font-bold tracking-tight text-balance sm:text-4xl"
      [class.text-neutral]="tone() === 'default'"
      [class.text-white]="tone() === 'inverse'"
    >
      {{ title() }}
    </h2>
    @if (subtitle()) {
      <p
        class="mt-4 text-base leading-relaxed text-pretty sm:text-lg"
        [class.text-muted]="tone() === 'default'"
        [class.text-white/85]="tone() === 'inverse'"
      >
        {{ subtitle() }}
      </p>
    }
  `,
})
export class SectionHeading {
  readonly headingId = input.required<string>();
  readonly title = input.required<string>();
  readonly eyebrow = input('');
  readonly subtitle = input('');
  readonly align = input<'left' | 'center'>('center');
  readonly tone = input<'default' | 'inverse'>('default');
}
