import { User } from './user.model';
import { Post } from './post.model';

export interface CommentModel {
  content: string;
  author: User;
  post: Post;
  creationDate: Date;
}
