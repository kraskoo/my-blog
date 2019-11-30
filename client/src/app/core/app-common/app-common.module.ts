import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightSideCommonComponent } from './right-side-common/right-side-common.component';

@NgModule({
  declarations: [
    RightSideCommonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RightSideCommonComponent
  ]
})
export class AppCommonModule { }
