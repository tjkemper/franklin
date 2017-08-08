import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class WeekStatsComponent implements OnInit, OnDestroy {

  subscribing: boolean = true;
  virtue: string;

  labels: string[] = [];
  datasets = [];
  chartType: string = 'line';
  ok: boolean = false; //ok to show chart

  constructor(
    private activatedRoute: ActivatedRoute,
    private deckStoreService: DeckStoreService,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.deckStoreService.decks.takeWhile( () => this.subscribing ).subscribe(deck => {
      this.activatedRoute.params.takeWhile( () => this.subscribing ).subscribe(params => {
        this.virtue = params.virtue;
        let set = { data: [], label: this.virtue };
        this.statsService.weeks(deck, this.virtue).then(weeks => {
          weeks.map((value: Week) => {
            this.labels.unshift(value.startDate);
            set.data.unshift(value.count);
          });
          this.datasets.push(set);
          this.ok = true;
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscribing = false;
  }

}
