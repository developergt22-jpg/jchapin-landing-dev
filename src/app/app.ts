import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-dvh flex-col' },
  template: `
    <a
      href="#contenido"
      class="sr-only z-50 rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      (click)="skipToContent($event)"
    >
      Saltar al contenido
    </a>

    <app-header />

    <main id="contenido" #main tabindex="-1" class="flex-1 focus:outline-none">
      <router-outlet />
    </main>

    <app-footer />
  `,
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  /** El ancla `#contenido` con `<base href="/">` navegaría al home; se mueve el foco a mano. */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
