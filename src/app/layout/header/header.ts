import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu, X } from 'lucide';

import { APP } from '../../core/config/app-links';
import { Icon } from '../../shared/components/icon/icon';

interface NavItem {
  readonly label: string;
  readonly fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
  templateUrl: './header.html',
})
export class Header {
  protected readonly app = APP;
  protected readonly menuIcon = Menu;
  protected readonly closeIcon = X;

  protected readonly nav: readonly NavItem[] = [
    { label: 'Funciones', fragment: 'funciones' },
    { label: 'Cómo funciona', fragment: 'como-funciona' },
    { label: 'Capturas', fragment: 'capturas' },
    { label: 'Preguntas', fragment: 'preguntas' },
  ];

  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }
}
