import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Play } from 'lucide';

import { Icon } from '../icon/icon';

/**
 * Botón propio hacia Google Play mientras la app está en prueba cerrada.
 * Al publicar en producción, reemplazar por el badge oficial
 * (https://play.google.com/intl/es-419/badges/) sin modificarlo.
 *
 * Con `fragment` navega a un ancla del home; con `href` abre un enlace externo.
 */
@Component({
  selector: 'app-store-badge',
  imports: [NgTemplateOutlet, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #content>
      <app-icon [icon]="playIcon" [size]="26" class="text-secondary-container" />
      <span class="flex flex-col text-left leading-tight">
        <span class="text-[0.7rem] font-medium tracking-wide uppercase opacity-80">{{ caption() }}</span>
        <span class="text-lg font-semibold">{{ label() }}</span>
      </span>
    </ng-template>

    @if (fragment()) {
      <a routerLink="/" [fragment]="fragment()" [class]="classes">
        <ng-container *ngTemplateOutlet="content" />
      </a>
    } @else {
      <a [href]="href()" target="_blank" rel="noopener" [class]="classes">
        <ng-container *ngTemplateOutlet="content" />
        <span class="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    }
  `,
})
export class StoreBadge {
  readonly label = input('Google Play');
  readonly caption = input('Únete a la beta en');
  readonly href = input('');
  readonly fragment = input('');

  protected readonly playIcon = Play;
  protected readonly classes =
    'inline-flex min-h-14 items-center gap-3 rounded-2xl bg-neutral px-5 py-2 text-white ring-1 ring-white/20 transition-colors hover:bg-black';
}
