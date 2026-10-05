import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Check } from 'lucide';

import { ROLES } from '../../../../core/data/roles';
import { screenshotById } from '../../../../core/data/screenshots';
import { Icon } from '../../../../shared/components/icon/icon';
import { PhoneFrame } from '../../../../shared/components/phone-frame/phone-frame';
import { SectionHeading } from '../../../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-roles',
  imports: [Icon, PhoneFrame, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="roles" aria-labelledby="roles-title" class="bg-white py-20">
      <div class="container-page">
        <app-section-heading
          headingId="roles-title"
          eyebrow="Para cada rol"
          title="Una app para todos los que hacen posible un evento"
          subtitle="Asistentes, organizadores, municipalidades y staff trabajan en el mismo lugar."
        />

        <ul class="mt-12 grid gap-6 lg:grid-cols-2">
          @for (role of roles; track role.id) {
            <li class="flex gap-5 overflow-hidden rounded-2xl bg-surface p-6 ring-1 ring-surface-dim/60">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex size-12 items-center justify-center rounded-xl bg-secondary-container text-secondary"
                  >
                    <app-icon [icon]="role.icon" />
                  </span>
                  <div>
                    <h3 class="text-xl font-semibold text-neutral">{{ role.title }}</h3>
                    <p class="text-sm text-muted">{{ role.summary }}</p>
                  </div>
                </div>
                <ul class="mt-5 space-y-2">
                  @for (bullet of role.bullets; track bullet) {
                    <li class="flex gap-2 leading-relaxed text-muted">
                      <app-icon [icon]="check" [size]="20" class="mt-0.5 text-primary" />
                      <span>{{ bullet }}</span>
                    </li>
                  }
                </ul>
              </div>
              <app-phone-frame
                class="hidden w-32 shrink-0 self-center sm:block"
                [screenshot]="shot(role.screenshot)"
                sizes="128px"
              />
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Roles {
  protected readonly roles = ROLES;
  protected readonly check = Check;
  protected readonly shot = screenshotById;
}
