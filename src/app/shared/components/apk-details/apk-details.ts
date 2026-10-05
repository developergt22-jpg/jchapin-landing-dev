import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { APP } from '../../../core/config/app-links';

const dateFormat = new Intl.DateTimeFormat('es-GT', { dateStyle: 'long', timeZone: 'UTC' });

/** Versión, tamaño, fecha y SHA-256 del APK publicado. */
@Component({
  selector: 'app-apk-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm" [class]="tone() === 'light' ? 'text-white/85' : 'text-muted'">
      <dt class="font-medium" [class]="labelClass()">Versión</dt>
      <dd>{{ apk.version }} (beta)</dd>
      <dt class="font-medium" [class]="labelClass()">Tamaño</dt>
      <dd>{{ apk.sizeMb ? apk.sizeMb + ' MB' : 'Por confirmar' }}</dd>
      <dt class="font-medium" [class]="labelClass()">Publicado</dt>
      <dd>{{ released }}</dd>
      <dt class="font-medium" [class]="labelClass()">SHA-256</dt>
      @if (apk.sha256) {
        <dd class="font-mono text-xs break-all">{{ apk.sha256 }}</dd>
      } @else {
        <dd>Se publica junto con el APK</dd>
      }
    </dl>
  `,
})
export class ApkDetails {
  readonly tone = input<'light' | 'dark'>('dark');

  protected readonly apk = APP.apk;
  protected readonly released = dateFormat.format(new Date(APP.apk.releasedAt));

  protected labelClass(): string {
    return this.tone() === 'light' ? 'text-white' : 'text-neutral';
  }
}
