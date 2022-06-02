import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { LoadMoreComponent } from './load-more.component';

@NgModule({
  declarations: [LoadMoreComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [LoadMoreComponent],
})
export class LoadMoreModule {}
