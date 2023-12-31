import { Inject, Injectable } from '@angular/core';

import { filter, map, of } from 'rxjs';
import {
  LANGUAGE_JSON_URL,
  TRANSLATOR_REPO_LAZYLOAD_HANDLERS,
} from '../tokens/language-json-url-token';
import { HttpClient } from '@angular/common/http';
import {
  ILazyloadHandler,
  RxActionLazyloadHandler,
  TranslationPart,
  TranslationRepository,
} from '@ubs-platform/translator-core';

@Injectable()
export class TranslatorRepositoryService extends TranslationRepository {
  registeredMap: { [key: string]: boolean } = {};
  constructor(
    private http: HttpClient,
    @Inject(TRANSLATOR_REPO_LAZYLOAD_HANDLERS) handlers: ILazyloadHandler[],
    @Inject(LANGUAGE_JSON_URL) languageUrls?: Array<(url: string) => string>
  ) {
    super();

    const urls =
      languageUrls?.map((languageUrl) => {
        return new RxActionLazyloadHandler((language: string) => {
          const url = languageUrl(language);
          if (this.registeredMap[url]) {
            return of([]);
          } else {
            this.registeredMap[url] = true;
            return this.http
              .get(url)
              .pipe(map((a) => a as TranslationPart | TranslationPart[]));
          }
        });
      }) || [];

    this.getLazyloadHelper().insert(...urls, ...handlers);
  }
}
