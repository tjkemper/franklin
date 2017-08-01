import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { VirtueData, Card } from '../model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  displayedColumns = ['virtue', ...this.daysOfWeek];
  dataSource: ExampleDataSource | null;
  today = new Date();

  @Input() card: Card;

  constructor(
    private changeDetector: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.card);
    this.changeDetector.detectChanges();
  }

  increment(row, day) {
    console.log(row.virtue, day);
    row[day]++;
  }

  mousedown(event) {
    event.preventDefault(); //prevent text highlighting
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {

  constructor(private card: Card) {
    super();
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<VirtueData[]> {
    return Observable.of(this.card.virtueData);
  }

  disconnect() {}
}
