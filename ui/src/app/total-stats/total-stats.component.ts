import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DeckStoreService } from '../deck-store.service';
import { StatsService } from '../stats.service';
import { Total } from '../model';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.css']
})
export class TotalStatsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  labels: string[] = [];
  data: number[] = [];
  chartType: string = 'doughnut';
  ok: boolean = false; //ok to show chart

  weeksVirtue: string;
  weeksColor: string;

  constructor(
    private deckStoreService: DeckStoreService,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.subscription = this.deckStoreService.decks.subscribe(deck => {
      this.statsService.total(deck).then(totals => {
        totals.map((value: Total) => {
          this.labels.push(value.virtue);
          this.data.push(value.total);
        });
        this.ok = true;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public chartClicked(event) {
    if(event.active[0]) {
      this.weeksVirtue = this.labels[event.active[0]._index];
      this.weeksColor = event.active[0]._model.backgroundColor;
    }
  }

}
