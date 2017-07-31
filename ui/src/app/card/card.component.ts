import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { VirtueData } from '../virtue-data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  displayedColumns = ['virtue', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  today = new Date();

  constructor(
    private changeDetector: ChangeDetectorRef
  ){}

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
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


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<VirtueData[]> = new BehaviorSubject<VirtueData[]>([]);
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<VirtueData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return [
        {virtue: "temperance",  "sunday": 1, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "silence",     "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "order",       "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "resolution",  "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "frugality",   "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "industry",    "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "sincerity",   "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "justice",     "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "moderation",  "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "cleanliness", "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "chastity",    "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "tranquility", "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        {virtue: "humility",    "sunday": 0, "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0},
        
      ];
    });
  }

  disconnect() {}
}
