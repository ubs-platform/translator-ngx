import { OnDestroy } from '@angular/core';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslatorRepositoryService } from '../service/translator-service.service';
import { TranslationParameter } from '@ubs-platform/translator-core';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  translation: string = '';
  subscription?: any;

  constructor(
    private ref: ChangeDetectorRef,
    private translator: TranslatorRepositoryService
  ) {}

  disposeOld() {
    this.subscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.disposeOld();
  }

  transform(key: string, parameters?: TranslationParameter): string {
    this.disposeOld();
    this.subscription = this.translator
      .getStringListenChanges({ key, parameters })
      .subscribe((a) => {
        if (this.translation != a) {
          this.translation = a;
          this.ref.markForCheck();
        }
      });

    return this.translation;
  }
}
