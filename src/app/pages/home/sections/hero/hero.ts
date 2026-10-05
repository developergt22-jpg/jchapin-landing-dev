import { ChangeDetectionStrategy, Component } from '@angular/core';

import { screenshotById } from '../../../../core/data/screenshots';
import { ApkButton } from '../../../../shared/components/apk-button/apk-button';
import { BetaBadge } from '../../../../shared/components/beta-badge/beta-badge';
import { PhoneFrame } from '../../../../shared/components/phone-frame/phone-frame';
import { StoreBadge } from '../../../../shared/components/store-badge/store-badge';

@Component({
  selector: 'app-hero',
  imports: [ApkButton, BetaBadge, PhoneFrame, StoreBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="hero-title" class="relative overflow-hidden bg-primary text-white">
      <div
        class="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-primary-container blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-40 -left-24 size-[22rem] rounded-full bg-secondary/40 blur-3xl"
        aria-hidden="true"
      ></div>

      <div class="container-page relative grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div>
          <app-beta-badge tone="light" />
          <h1
            id="hero-title"
            class="mt-5 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Descubre y vive los eventos de Guatemala
          </h1>
          <p class="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/85">
            Encuentra eventos cerca de ti, reserva tu entrada con código QR y llega a tiempo con rutas
            y tráfico en vivo.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <app-store-badge fragment="descargar" />
            <app-apk-button tone="light" />
          </div>
          <p class="mt-4 text-sm text-white/70">Gratis · Android 7.0 o superior</p>
        </div>

        <app-phone-frame
          class="mx-auto w-full max-w-[270px] lg:max-w-[300px]"
          [screenshot]="shot"
          [priority]="true"
          sizes="(min-width: 1024px) 300px, 270px"
        />
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly shot = screenshotById('01-inicio');
}
