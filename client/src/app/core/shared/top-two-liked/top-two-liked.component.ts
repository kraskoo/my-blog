import { Component, OnInit, Input } from '@angular/core';
import { ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'top-two-liked',
  templateUrl: './top-two-liked.component.html',
  styleUrls: ['./top-two-liked.component.css']
})
export class TopTwoLikedComponent {
  @Input() posts: ExtendedPost[];
}
