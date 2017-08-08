import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  // events
  public chartClicked(event) {
    console.log(event);
    if(event.active[0]) {
      console.log(this.labels[event.active[0]._index]);
      let clickedVirtue = this.labels[event.active[0]._index];
      this.router.navigate([ clickedVirtue ], { relativeTo: this.activatedRoute });
    }
  }
 
  public chartHovered(e:any) {
    console.log(e);
  }
}
