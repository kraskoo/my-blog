import { User } from './user.model';
import { Post } from './post.model';

export interface CommentModel {
  _id: string;
  content: string;
  author: User;
  post: Post;
  creationDate: Date;
}
