import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { PipeModule } from '../pipes/pipe.module';
import { PostRoutingModule } from './post-routing.module';
import { SearchedPostsComponent } from './searched-posts/searched-posts.component';
import { ArchivePostsComponent } from './archive-posts/archive-posts.component';
import { ResumePostComponent } from './resume-post/resume-post.component';
import { ResumeLikedPostComponent } from './resume-liked-post/resume-liked-post.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { ResumeArchivesComponent } from './resume-archives/resume-archives.component';

@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent,
    SearchedPostsComponent,
    ArchivePostsComponent,
    ResumePostComponent,
    ResumeLikedPostComponent,
    ResumeArchivesComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    AngularEditorModule,
    FormsModule,
    AppCommonModule,
    PipeModule
  ],
  exports: [
    ResumeArchivesComponent,
    ResumeLikedPostComponent,
    ResumePostComponent
  ]
})
export class PostModule {}
