import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Download } from './sections/download/download';
import { EventFlow } from './sections/event-flow/event-flow';
import { Faq } from './sections/faq/faq';
import { Features } from './sections/features/features';
import { Hero } from './sections/hero/hero';
import { HowItWorks } from './sections/how-it-works/how-it-works';
import { Roles } from './sections/roles/roles';
import { Screenshots } from './sections/screenshots/screenshots';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, HowItWorks, Roles, EventFlow, Screenshots, Download, Faq],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-features />
    <app-how-it-works />
    <app-roles />
    <app-event-flow />
    <app-screenshots />
    <app-download />
    <app-faq />
  `,
})
export default class Home {}
