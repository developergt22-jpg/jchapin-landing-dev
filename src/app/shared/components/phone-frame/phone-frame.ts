import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SCREENSHOT_SIZE } from '../../../core/data/screenshots';
import type { Screenshot } from '../../../core/models';

/** Cada captura existe en 1080 px (`<id>.webp`) y 540 px (`<id>-540.webp`). */
function screenshotLoader({ src, width }: ImageLoaderConfig): string {
  return width && width <= 540 ? src.replace(/\.webp$/, '-540.webp') : src;
}

/** Marco de teléfono para mostrar una captura de la app. */
@Component({
  selector: 'app-phone-frame',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: IMAGE_LOADER, useValue: screenshotLoader }],
  host: { class: 'block' },
  template: `
    <div
      class="relative rounded-[2.25rem] bg-neutral p-2 shadow-2xl shadow-neutral/30 ring-1 ring-black/10"
    >
      <div class="overflow-hidden rounded-[1.75rem] bg-surface">
        <img
          [ngSrc]="src()"
          ngSrcset="540w, 1080w"
          [sizes]="sizes()"
          [width]="size.width"
          [height]="size.height"
          [alt]="screenshot().alt"
          [priority]="priority()"
          class="block h-auto w-full"
        />
      </div>
    </div>
  `,
})
export class PhoneFrame {
  readonly screenshot = input.required<Screenshot>();
  /** Solo la captura del hero (LCP). */
  readonly priority = input(false);
  readonly sizes = input('(min-width: 1024px) 300px, 70vw');

  protected readonly size = SCREENSHOT_SIZE;
  protected readonly src = computed(() => `images/screenshots/${this.screenshot().id}.webp`);
}
