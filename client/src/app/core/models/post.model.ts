import { User } from './user.model';
import { CommentModel } from './comment.model';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  comments: CommentModel[];
  creationDate: Date;
  likes: number;
}

export interface ExtendedPost {
  _id: string;
  title: string;
  content: string;
  author: User;
  comments: CommentModel[];
  creationDate: Date;
  likes: number;
  shortContent: string;
}
