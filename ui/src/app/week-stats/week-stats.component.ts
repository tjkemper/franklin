import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

import { DeckStoreService } from '../deck-store.service';
import { StatsService } from '../stats.service';
import { Week } from '../model';

@Component({
  selector: 'app-week-stats',
  templateUrl: './week-stats.component.html',
  styleUrls: ['./week-stats.component.css']
})
export class WeekStatsComponent implements OnChanges {

  @Input() virtue: string;
  @Input() color: string;

  labels: string[] = [];
  datasets = [];
  colors: Array<any> = [];
  chartType: string = 'line';
  ok: boolean = false; //ok to show chart

  constructor(
    private router: Router,
    private deckStoreService: DeckStoreService,
    private statsService: StatsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if(!this.deckStoreService.deck) {
      this.router.navigateByUrl('');
    }
    
    this.reset();
    this.virtue = changes.virtue.currentValue;
    
    let set = { data: [], label: this.virtue };
    if(this.color) {
      this.colors.push({ backgroundColor: this.color });
    }
    this.statsService.weeks(this.deckStoreService.deck, this.virtue).then(weeks => {
      weeks.map((value: Week) => {
        this.labels.unshift(value.startDate);
        set.data.unshift(value.count);
      });
      this.datasets.push(set);
      this.ok = true;
    });
  }

  reset() {
    this.labels = [];
    this.datasets = [];
    this.colors = [];
    this.ok = false;
  }

}
