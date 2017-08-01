import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Deck, CardData, Card } from './model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {

  next: string;

  constructor(
    private http: Http
  ) { }

  //POST /decks returns Deck
  createDeck(): Promise<Deck> {
    return Promise.resolve({ id: "abc", created: "1501542013" });
  }

  //GET /decks/{deckId}?page={pageNum}&size={pageSize} returns CardData
  getNextPage(): Promise<CardData> {
    let url = "assets/json/page1.json";
    if(this.next) {
      url = this.next;
    }
    
    return this.http.get(url)
                    .toPromise()
                    .then(response => {
                      let json = response.json() as CardData;
                      this.next = json.next;
                      return json;
                    });
  }

  //PUT /decks/{deckId}/{cardId} expects Card returns Card
  updateCard(card: Card): Promise<Card> {
    return Promise.resolve(card);
  }



}
