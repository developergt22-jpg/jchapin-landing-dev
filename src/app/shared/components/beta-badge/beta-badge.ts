import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-beta-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
      [class]="
        tone() === 'light'
          ? 'bg-white/15 text-white ring-1 ring-white/30'
          : 'bg-secondary-container/50 text-secondary ring-1 ring-secondary/20'
      "
    >
      <span class="size-2 rounded-full bg-current" aria-hidden="true"></span>
      {{ text() }}
    </span>
  `,
})
export class BetaBadge {
  readonly text = input('Beta · Prueba cerrada en Android');
  readonly tone = input<'light' | 'dark'>('dark');
}
