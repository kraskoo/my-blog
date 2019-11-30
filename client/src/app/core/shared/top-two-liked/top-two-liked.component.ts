import { Component, OnInit, Input } from '@angular/core';
import { ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'top-two-liked',
  templateUrl: './top-two-liked.component.html',
  styleUrls: ['./top-two-liked.component.css']
})
export class TopTwoLikedComponent implements OnInit {
  @Input() posts: ExtendedPost[];
  topTwoLikesPosts: ExtendedPost[];

  ngOnInit() {
    this.topTwoLikesPosts = this.posts.sort((a, b) => {
      const likesDiff = b.likes - a.likes;
      if (likesDiff === 0) {
        const lengthDiff = b.comments.length - a.comments.length;
        if (lengthDiff === 0) {
          return b.creationDate.getDate() - a.creationDate.getDate();
        }

        return lengthDiff;
      }

      return likesDiff;
    }).slice(0, 2);
  }
}
