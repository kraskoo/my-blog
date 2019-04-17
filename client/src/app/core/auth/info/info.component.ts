import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.user = this.route.snapshot.data['user'];
  }

  info() {
    return this.user.info;
  }
}
