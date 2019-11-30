import { Component, Input } from '@angular/core';
import { ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'resume-post',
  templateUrl: './resume-post.component.html',
  styleUrls: ['./resume-post.component.css']
})
export class ResumePostComponent {
  @Input() post: ExtendedPost;
  @Input() titleTag: string;
}
