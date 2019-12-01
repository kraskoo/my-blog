import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../../services/meta-data-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.metadataService.updateTitle('About');
    this.metadataService.updateAllMetas();
  }
}
