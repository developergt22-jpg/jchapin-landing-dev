import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconNode } from 'lucide';

/**
 * Ícono SVG inline a partir de un ícono de `lucide` importado por nombre
 * (`import { MapPin } from 'lucide'`), así solo se empaquetan los que se usan.
 * Es decorativo por defecto; si transmite información, pasar `label`.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.aria-label]="label() || null"
      [attr.role]="label() ? 'img' : null"
      focusable="false"
    >
      @for (node of icon(); track $index) {
        @let a = node[1];
        @switch (node[0]) {
          @case ('path') {
            <svg:path [attr.d]="a['d']" />
          }
          @case ('circle') {
            <svg:circle [attr.cx]="a['cx']" [attr.cy]="a['cy']" [attr.r]="a['r']" />
          }
          @case ('rect') {
            <svg:rect
              [attr.x]="a['x']"
              [attr.y]="a['y']"
              [attr.width]="a['width']"
              [attr.height]="a['height']"
              [attr.rx]="a['rx']"
              [attr.ry]="a['ry']"
            />
          }
          @case ('line') {
            <svg:line [attr.x1]="a['x1']" [attr.y1]="a['y1']" [attr.x2]="a['x2']" [attr.y2]="a['y2']" />
          }
          @case ('ellipse') {
            <svg:ellipse [attr.cx]="a['cx']" [attr.cy]="a['cy']" [attr.rx]="a['rx']" [attr.ry]="a['ry']" />
          }
          @case ('polyline') {
            <svg:polyline [attr.points]="a['points']" />
          }
          @case ('polygon') {
            <svg:polygon [attr.points]="a['points']" />
          }
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly icon = input.required<IconNode>();
  readonly size = input(24);
  readonly strokeWidth = input(2);
  readonly label = input('');
}
