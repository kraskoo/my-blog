import { Component, OnInit } from '@angular/core';
import { MetadataService } from './core/services/meta-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.metadataService.updateTitle('', false);
    this.metadataService.updateAllMetas();
  }
}
