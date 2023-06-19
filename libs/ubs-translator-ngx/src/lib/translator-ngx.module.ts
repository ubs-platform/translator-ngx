import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslatorRepositoryService } from './service/translator-service.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  providers: [],
})
export class TranslatorNgxModule {}
