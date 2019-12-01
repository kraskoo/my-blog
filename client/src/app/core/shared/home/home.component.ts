import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, ExtendedPost } from '../../models/post.model';
import { Title, Meta } from '@angular/platform-browser';
import { Metadata, defaultMetadata, getAllMetas } from '../../services/meta-data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: ExtendedPost[] = [];
  private metas: Metadata = defaultMetadata;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta) { }

  ngOnInit() {
    const title = `${defaultMetadata.title} - Home`;
    this.titleService.setTitle(title);
    getAllMetas(this.metas, this.metaService);
    // tslint:disable-next-line: no-string-literal
    this.posts = (this.route.snapshot.data['posts'] as Post[]).map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }
}
