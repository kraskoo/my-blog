import { NgModule } from '@angular/core';
import { SafePipe } from '../pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe]
})
export class PipeModule { }
