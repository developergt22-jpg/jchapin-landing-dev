import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-page flex flex-col items-center py-24 text-center">
      <p class="text-6xl font-bold text-primary">404</p>
      <h1 class="mt-4 text-3xl font-bold text-neutral">No encontramos esta página</h1>
      <p class="mt-3 max-w-md text-muted">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a routerLink="/" class="btn-primary">Ir al inicio</a>
        <a routerLink="/descargar" class="btn-outline text-primary hover:bg-primary/5">Descargar la app</a>
      </div>
    </div>
  `,
})
export default class NotFound {}
