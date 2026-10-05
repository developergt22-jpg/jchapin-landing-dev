import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Download } from 'lucide';

import { APP } from '../../../core/config/app-links';
import { Icon } from '../icon/icon';

/** Descarga directa del APK con versión y tamaño en el texto del botón. */
@Component({
  selector: 'app-apk-button',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (apk.available) {
      <a [href]="apk.url" download [class]="classes()">
        <app-icon [icon]="downloadIcon" [size]="20" />
        {{ text() }}
      </a>
    } @else {
      <span [class]="classes()" class="cursor-not-allowed opacity-70" aria-disabled="true">
        <app-icon [icon]="downloadIcon" [size]="20" />
        APK disponible pronto
      </span>
    }
  `,
})
export class ApkButton {
  /** `light`: sobre fondos oscuros (hero). `dark`: sobre fondos claros. */
  readonly tone = input<'light' | 'dark'>('dark');

  protected readonly apk = APP.apk;
  protected readonly downloadIcon = Download;

  protected readonly text = computed(() => {
    const size = this.apk.sizeMb ? `, ${this.apk.sizeMb} MB` : '';
    return `Descargar APK (v${this.apk.version}${size})`;
  });

  protected readonly classes = computed(() =>
    this.tone() === 'light'
      ? 'btn-outline text-white hover:bg-white/10'
      : 'btn-outline text-primary hover:bg-primary/5',
  );
}
