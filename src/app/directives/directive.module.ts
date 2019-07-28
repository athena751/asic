import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { FocusDirective } from './input-focus.directive';
import { CurrencyMaskService } from './currency-mask.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CurrencyMaskDirective, FocusDirective],
  declarations: [CurrencyMaskDirective, FocusDirective],
  providers: [CurrencyMaskService]
})
export class DirectivesModule {}
