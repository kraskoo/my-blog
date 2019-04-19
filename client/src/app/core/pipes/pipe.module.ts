import { NgModule } from '@angular/core';
import { SafePipe } from '../pipes/safe.pipe';
import { SortPostsPipe } from './sort-posts.pipe';
import { ArchiveDatePipe } from './archive-date.pipe';

@NgModule({
  declarations: [
    SafePipe,
    SortPostsPipe,
    ArchiveDatePipe
  ],
  exports: [
    SafePipe,
    SortPostsPipe,
    ArchiveDatePipe
  ]
})
export class PipeModule { }
