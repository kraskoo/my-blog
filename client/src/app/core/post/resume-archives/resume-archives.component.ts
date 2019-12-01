import { Component, OnInit, Input } from '@angular/core';
import { ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'resume-archives',
  templateUrl: './resume-archives.component.html',
  styleUrls: ['./resume-archives.component.css']
})
export class ResumeArchivesComponent implements OnInit {
  @Input() dates: Date[] = [];
  archives: { key: string, value: string }[] = [];

  ngOnInit(): void {
    this.dates.forEach(p => {
      const creationDate = new Date(p);
      const month = creationDate.getMonth();
      const year = creationDate.getFullYear();
      const key = `${`${month}`.length === 1 ? `0${month}` : month}-${year}`;
      const value = `/post/archives/${month}/${year}`;
      if (this.archives.filter(a => a.key === key).length === 0) {
        this.archives.push({ key, value });
      }
    });
    this.archives = this.archives.sort((a, b) => a.key.localeCompare(b.key));
  }
}
