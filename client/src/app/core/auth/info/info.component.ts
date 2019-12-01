import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../services/meta-data-service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataService) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.user = this.route.snapshot.data['user'];
    const userFullname = `${this.user.firstName} ${this.user.lastName}`;
    this.metadataService.updateTitle(`${this.metadataService.metas.title} - ${userFullname} Info`);
    const metas = {
      ...this.metadataService.metas,
      author: { name: 'author', content: userFullname }
    };
    this.metadataService.updateAllMetas(metas);
  }

  info() {
    return this.user.info;
  }

  userName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
