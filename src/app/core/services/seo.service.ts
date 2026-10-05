import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';

import { APP } from '../config/app-links';

/** Se define en `data.seo` de cada ruta. El título sale de `title` de la ruta. */
export interface SeoData {
  /** ≤ 155 caracteres. */
  readonly description: string;
  /** Ruta canónica; por defecto, la URL actual. */
  readonly path?: string;
  readonly noindex?: boolean;
  readonly jsonLd?: () => Record<string, unknown>[];
}

const OG_IMAGE = '/images/og-image.png';
const JSON_LD_ID = 'seo-jsonld';

/** Title, meta, canonical, Open Graph, Twitter y JSON-LD; se prerenderiza en el HTML de cada ruta. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly titleStrategy = inject(TitleStrategy);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  init(): void {
    const sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const snapshot = this.router.routerState.snapshot;
        this.apply(this.deepest(snapshot.root), this.titleStrategy.buildTitle(snapshot) ?? APP.name, e.urlAfterRedirects);
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  private apply(route: ActivatedRouteSnapshot, title: string, url: string): void {
    const seo = route.data['seo'] as SeoData | undefined;
    const description = seo?.description ?? '';
    const path = seo?.path ?? url.split(/[?#]/)[0];
    const canonical = new URL(path, APP.siteUrl).toString();
    const image = new URL(OG_IMAGE, APP.siteUrl).toString();
    const noindex = seo?.noindex ?? !seo;

    this.setName('description', description);
    this.setName('robots', noindex ? 'noindex, follow' : 'index, follow');

    this.setProperty('og:type', 'website');
    this.setProperty('og:locale', 'es_GT');
    this.setProperty('og:site_name', APP.name);
    this.setProperty('og:title', title);
    this.setProperty('og:description', description);
    this.setProperty('og:url', canonical);
    this.setProperty('og:image', image);
    this.setProperty('og:image:width', '1200');
    this.setProperty('og:image:height', '630');
    this.setProperty('og:image:alt', `${APP.name}: descubre y vive los eventos de Guatemala`);

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', title);
    this.setName('twitter:description', description);
    this.setName('twitter:image', image);

    this.setCanonical(noindex ? null : canonical);
    this.setJsonLd(seo?.jsonLd?.() ?? []);
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string | null): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(data: Record<string, unknown>[]): void {
    this.document.getElementById(JSON_LD_ID)?.remove();
    if (!data.length) {
      return;
    }
    const script = this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    // `<` escapado para que ningún texto pueda cerrar la etiqueta <script>.
    script.textContent = JSON.stringify(data.length === 1 ? data[0] : data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }
}
