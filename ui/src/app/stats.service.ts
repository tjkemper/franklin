import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Deck, Total, Week } from './model';


@Injectable()
export class StatsService {

  constructor(
    private http: Http
  ) { }

  total(deck: Deck): Promise<Total[]> {
    return this.http.get('assets/json/stats/total.json')
                    .toPromise()
                    .then(response => response.json().data as Total[]);
  }

  weeks(deck: Deck, virtue: string): Promise<Week[]> {
    return this.http.get(`assets/json/stats/${virtue}.json`)
                    .toPromise()
                    .then(response => response.json().data as Week[]);
  }  

}
