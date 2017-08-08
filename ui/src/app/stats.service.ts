import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Total } from './model';


@Injectable()
export class StatsService {

  constructor(
    private http: Http
  ) { }

  total(): Promise<Total> {
    return this.http.get('assets/json/stats/total.json')
                    .toPromise()
                    .then(response => response.json() as Total);
  }

}
