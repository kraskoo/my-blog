import { Component, Input } from '@angular/core';
import { ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'resume-liked-post',
  templateUrl: './resume-liked-post.component.html',
  styleUrls: ['./resume-liked-post.component.css']
})
export class ResumeLikedPostComponent {
  @Input() post: ExtendedPost;
}
