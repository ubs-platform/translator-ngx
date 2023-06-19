import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from './pipes/translate.pipe';
@NgModule({
  imports: [CommonModule],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class UbsTranslatorNgxModule {}
