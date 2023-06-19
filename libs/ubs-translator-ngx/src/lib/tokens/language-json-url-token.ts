import { InjectionToken } from '@angular/core';
import {
  ILazyloadHandler,
  TranslationPart,
} from '@ubs-platform/translator-core';
import { Observable } from 'rxjs';

export const LANGUAGE_JSON_URL = new InjectionToken<
  Array<(language: string) => string>
>('LANGUAGE_URL');

export const TRANSLATOR_REPO_LAZYLOAD_HANDLERS = new InjectionToken<
  Array<ILazyloadHandler[]>
>('TRANSLATOR_REPO_LAZYLOAD_HELPER', {
  factory: () => [],
});
