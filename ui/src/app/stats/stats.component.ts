import { Component, OnInit } from '@angular/core';

import { StatsService } from '../stats.service';
import { Total } from '../model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  total: Total;

  constructor(
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.statsService.total().then(total => this.total = total);
  }

}
