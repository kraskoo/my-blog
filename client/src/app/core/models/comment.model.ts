import { User } from './user.model';
import { Post } from './post.model';

export interface Comment {
  content: string;
  author: User;
  post: Post;
  creationDate: Date;
}
