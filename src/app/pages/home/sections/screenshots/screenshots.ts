import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { ChevronLeft, ChevronRight } from 'lucide';

import { SCREENSHOTS } from '../../../../core/data/screenshots';
import { Icon } from '../../../../shared/components/icon/icon';
import { PhoneFrame } from '../../../../shared/components/phone-frame/phone-frame';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

/** Galería horizontal con scroll-snap (sin librerías); se carga al entrar en pantalla. */
@Component({
  selector: 'app-screenshots',
  imports: [Icon, PhoneFrame, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="capturas" aria-labelledby="capturas-title" class="overflow-hidden bg-white py-20">
      <div class="container-page">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <app-section-heading
            headingId="capturas-title"
            eyebrow="Capturas"
            title="Así se ve JChapín"
            subtitle="Un recorrido por las pantallas principales de la app."
            align="left"
          />
          <div class="hidden gap-2 sm:flex">
            <button type="button" class="btn-outline size-12 p-0 text-primary hover:bg-primary/5" (click)="scroll(-1)">
              <app-icon [icon]="prevIcon" />
              <span class="sr-only">Capturas anteriores</span>
            </button>
            <button type="button" class="btn-outline size-12 p-0 text-primary hover:bg-primary/5" (click)="scroll(1)">
              <app-icon [icon]="nextIcon" />
              <span class="sr-only">Capturas siguientes</span>
            </button>
          </div>
        </div>
      </div>

      @defer (on viewport) {
        <div
          #track
          role="region"
          aria-label="Galería de capturas, desplázate horizontalmente"
          tabindex="0"
          class="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:thin] scroll-px-4 sm:px-6 sm:scroll-px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          @for (shot of screenshots; track shot.id) {
            <figure class="w-52 shrink-0 snap-start sm:w-60">
              <app-phone-frame [screenshot]="shot" sizes="240px" />
              <figcaption class="mt-4 text-center text-sm font-medium text-muted">{{ shot.caption }}</figcaption>
            </figure>
          }
        </div>
      } @placeholder {
        <div class="mt-10 flex gap-6 overflow-hidden px-4 pb-16 sm:px-6" aria-hidden="true">
          @for (shot of screenshots.slice(0, 5); track shot.id) {
            <div class="aspect-[9/19.5] w-52 shrink-0 rounded-[2.25rem] bg-surface sm:w-60"></div>
          }
        </div>
      }
    </section>
  `,
})
export class Screenshots {
  protected readonly screenshots = SCREENSHOTS;
  protected readonly prevIcon = ChevronLeft;
  protected readonly nextIcon = ChevronRight;

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  protected scroll(direction: 1 | -1): void {
    const el = this.track()?.nativeElement;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  }
}
