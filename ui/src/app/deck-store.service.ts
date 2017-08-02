import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { DeckService } from './deck.service';
import { Deck } from './model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeckStoreService {

  key: string = "deck";
  _deck: Deck;
  deckData: Observable<Deck>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) { }

  decks(): Observable<Deck> {
    return this.deckData = new Observable<Deck>((deckObserver: Observer<Deck>) => {
      
      this.activatedRoute.queryParams
        .debounceTime(200)
        .subscribe((queryParams: Params) => {
          console.log('queryParam has changed.');
          let id: string = queryParams['id'];
          
          if(id) {
            console.log('queryParam id exists:', id);
            if(this.deck && id == this.deck.id) {
              deckObserver.next(this.deck);
            } else {
              console.log('queryParam id does not match localStorage.');
              this.deckService.getDeck(id).then(deck => {
                console.log('Overwriting localStorage.');
                this.deck = deck;
                deckObserver.next(this.deck);
              });
            }
            return;
          }
          console.log('queryParam id does not exist.')

          if(this.deck) {
            console.log('localStorage deck exists');  
            this.putQueryParam(); //will trigger another queryParam change event
            return;
          }
          console.log('localStorage deck does not exist.');

          console.log('queryParam and localStorage are missing... Create new deck.');
          this.deckService.createDeck()
                          .then(deck => {
                            this.deck = deck;
                            this.putQueryParam(); //will trigger another queryParam change event
                          });
      }); //end queryParam subscribe
    }); //end Observable<Deck> definition
    
  }

  putQueryParam() {
    console.log(`put queryParam in URL: ?id=${this.deck.id}`);
    this.router.navigate([], {
      queryParams: { id: this.deck.id },
      relativeTo: this.activatedRoute
    });
  }

  get deck(): Deck {
    if(this._deck) {
      return this._deck;
    }

    let json = localStorage.getItem(this.key);
    if(!json || json.length === 0) {
      return null;
    }

    this._deck = JSON.parse(json);
    return this._deck;
  }

  set deck(deck: Deck) {
    this._deck = deck;
    localStorage.setItem(this.key, JSON.stringify(deck));
  }

  clear() {
    localStorage.removeItem(this.key);
  }

}
