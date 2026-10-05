import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const dateFormat = new Intl.DateTimeFormat('es-GT', { dateStyle: 'long', timeZone: 'UTC' });

/** Estructura común de las páginas legales: título y fecha de actualización. */
@Component({
  selector: 'app-legal-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="bg-white py-14 sm:py-20">
      <div class="container-page">
        <h1 class="text-4xl font-bold tracking-tight text-balance text-neutral sm:text-5xl">{{ title() }}</h1>
        <p class="mt-3 text-sm text-muted">Última actualización: {{ formatted(updatedAt()) }}</p>

        <div class="prose-page mt-8">
          <ng-content />
        </div>
      </div>
    </article>
  `,
})
export class LegalLayout {
  readonly title = input.required<string>();
  /** Formato `AAAA-MM-DD`. */
  readonly updatedAt = input.required<string>();

  protected formatted(date: string): string {
    return dateFormat.format(new Date(date));
  }
}
