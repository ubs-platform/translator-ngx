# UBS Translator NGX (a14-c1.0.7)

A translator library for Angular, based [Translator Core](https://www.github.com/ubs-platform/translator-core)

[![Importante Resultante :d](http://img.youtube.com/vi/aa9nspVSr5c/0.jpg)](http://www.youtube.com/watch?v=aa9nspVSr5c 'Result video')

# Installation

```bash
npm install rxjs @ubs-platform/translator-core @ubs-platform/translator-ngx
```

⚠️ Currently natively working on Angular 14. If you have newer angular version, you can install by passing `--legacy-peer-deps`
It works fine on Angular 16. However, we working at the new upgrade for Angular 16

# How to use

## Before start

- Create directory named `lang` in `application path/assets/`
- And then; Create 3 json files in the `lang` directory

en.json:

```json
[
  {
    "stringMap": {
      "hello": "Hello, Welcome!"
    }
  },
  {
    "prefix": "languages",
    "stringMap": {
      "tr": "Turkish",
      "en": "English",
      "de": "German"
    }
  }
]
```

de.json

```json
[
  {
    "stringMap": {
      "hello": "Hallo, Willkommen!"
    }
  },
  {
    "prefix": "languages",
    "stringMap": {
      "tr": "Türkisch",
      "en": "Englisch",
      "de": "Deutsch"
    }
  }
]
```

tr.json:

```json
[
  {
    "stringMap": {
      "hello": "Merhaba, Hoş Geldiniz"
    }
  },
  {
    "prefix": "languages",
    "stringMap": {
      "tr": "Türkçe",
      "en": "İngilizce",
      "de": "Almanca"
    }
  }
]
```

Fun fact: In json files, you can define [TranspationPart](https://github.com/ubs-platform/translator-core/blob/main/src/lib/model/translation-part.ts) array or one translation part if you need just a TranspationPart

## In modular library/or application

- In app.module.ts or your library

  - Import `UbsTranslatorNgxModule` to use `translate` pipe and `HttpClientModule` to import required json files via `HttpClient`.

  - Provide `TranslatorRepositoryService` to keep translations and `LANGUAGE_JSON_URL`
    to load translation files as desired

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UbsTranslatorNgxModule, TranslatorRepositoryService, LANGUAGE_JSON_URL, EnvironmentController } from '@ubs-platform/translator-ngx';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

// Initialize the environment controller
// and start in default language
// and you can call it first at `main.ts` before module get bootstrapped
EnvironmentController.getEnvironmentController('en');

@NgModule({
  imports: [UbsTranslatorNgxModule, HttpClientModule, BrowserModule],
  providers: [
    TranslatorRepositoryService,
    {
      provide: LANGUAGE_JSON_URL,
      useValue: [(language: string) => `assets/lang/${language}.json`],
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- In component:

```typescript
import { Component } from '@angular/core';
import { EnvironmentController, LANGUAGE_JSON_URL, TranslatorRepositoryService, UbsTranslatorNgxModule } from '@ubs-platform/translator-ngx';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'translator-ngx-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Changes the language
   */
  changeLanguage(arg0: string) {
    EnvironmentController.getEnvironmentController().setLanguage(arg0);
  }
  title = 'translator-ngx-example';
}
```

- And the component template, you can use `translate` pipe to translating these texts

```html
<button (click)="changeLanguage('en')">{{ 'languages.en' | translate }}</button>
<button (click)="changeLanguage('tr')">{{ 'languages.tr' | translate }}</button>
<button (click)="changeLanguage('de')">{{ 'languages.de' | translate }}</button>
<h1>{{ 'hello' | translate }}</h1>
```

## In standalone components

In standalone components, there is similar operations in Angular modules.

- Import `UbsTranslatorNgxModule` to use `translate` pipe and `HttpClientModule` to import required json files via `HttpClient`.

- Provide `TranslatorRepositoryService` to keep translations and `LANGUAGE_JSON_URL`
  to load translation files as desired

- You can use same template and json files at in [The section: In modular library/or application](#in-modular-libraryor-application)

```typescript
// Initialize the environment controller and start in default language
EnvironmentController.getEnvironmentController('en');

import { Component } from '@angular/core';
import { EnvironmentController, LANGUAGE_JSON_URL, TranslatorRepositoryService, UbsTranslatorNgxModule } from '@ubs-platform/translator-ngx';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [UbsTranslatorNgxModule, HttpClientModule],
  providers: [
    TranslatorRepositoryService,
    {
      provide: LANGUAGE_JSON_URL,
      useValue: [(language: string) => `assets/lang/${language}.json`],
    },
  ],
  selector: 'translator-ngx-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  changeLanguage(arg0: string) {
    EnvironmentController.getEnvironmentController('en').setLanguage(arg0);
  }
  title = 'translator-ngx-example';
}
```

## Passing parameters in `translate` pipe

In translate part, some parameter definitions can be made with curly parentheses.

```json
{
  "stringMap": {
    "person-saved": "The person named {name} has been saved"
  }
}
```

Extra paramaters can be passed via

```html
{{ "person-saved" | translate: {name: 'Jason'} }}
```

After the render, you will see as:

```
The person named Jason has been saved
```

# Roadmap

We are planning to making documentation more detailed and upgrade the angular version at soon.

If you have any questions, improvements or any issue, you can open a issue or pull request without hesitation.

# Changelog

## 1.0.7

- Readme.md file is edited

## 1.0.6

- Worked on getting runnable

# Contact

## Hüseyin Can Gündüz

- [Linkedin](https://www.linkedin.com/in/huseyincgunduz/)
- [Instagram: @hussainlobo](https://instagram.com/hussainlobo)
