import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

export interface PageMetadata {
  title: string;
  imageRelativeUrl: string;
  description: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'Shopy',
  imageRelativeUrl: 'og-default.png',
  description: 'Descubre un mundo de estilo.',
  author: 'Hector Ruiz',
  keywords: ['Angular 17', 'SSR', 'words'],
  type: 'website',
};

@Injectable()
export class MetadataService {
  hostUrl = environment.hostUrl;

  defaultTags: MetaDefinition[] = [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
  ];

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private router: Router
  ) {}

  public removeTags(): void {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:site_name'");
    this.metaService.removeTag("property='og:url'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:author'");
    this.metaService.removeTag("property='og:type'");
    this.metaService.removeTag("name='description'");
    this.metaService.removeTag("name='title'");
    this.metaService.removeTag("name='author'");
    this.metaService.removeTag("name='keywords'");
  }

  public extractWords(text: string[]): string[] {
    const words: string[] = text
      .join(' ')
      .replace(/,/g, ' ')
      .replace(/\./g, ' ')
      .split(' ')
      .filter(w => !!w);

    return words;
  }

  public updateMetadata(
    metadata: Partial<PageMetadata>,
    index: boolean = true
  ): void {
    const pageMetadata: PageMetadata = { ...defaultMetadata, ...metadata };

    this.titleService.setTitle(pageMetadata.title);

    const metatags: MetaDefinition[] =
      this.generateMetaDefinitions(pageMetadata);

    this.metaService.addTags(
      [
        ...metatags,
        ...this.defaultTags,
        { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      ],
      false
    );
  }

  private generateMetaDefinitions(
    metadata: PageMetadata
  ): MetaDefinition[] {
    return [
      { property: 'og:url', content: `${this.hostUrl}${this.router.url}` },

      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: 'keywords', content: metadata.keywords.join(', ') },
      { property: 'og:type', content: metadata.type },

      {
        property: 'og:image',
        content: `${this.hostUrl}${metadata.imageRelativeUrl}`,
      },
    ];
  }
}
