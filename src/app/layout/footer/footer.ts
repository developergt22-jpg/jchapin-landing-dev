import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP } from '../../core/config/app-links';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly app = APP;
  protected readonly year = new Date().getFullYear();

  protected readonly links = [
    { label: 'Descargar', path: '/descargar' },
    { label: 'Privacidad', path: '/privacidad' },
    { label: 'Términos', path: '/terminos' },
    { label: 'Eliminar cuenta', path: '/eliminar-cuenta' },
  ] as const;
}
