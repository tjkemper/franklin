import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Deck, CardData, Card } from './model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {

  current: CardData;
  sending: boolean = false;

  constructor(
    private http: Http
  ) { }

//GET /decks expects id returns Deck
  getDeck(id: string): Promise<Deck> {
    return Promise.resolve({ id: id, created: "1501542010" });
  }

  //POST /decks returns Deck
  createDeck(): Promise<Deck> {
    return Promise.resolve({ id: "abc", created: "1501542013" });
  }

  getFirstPage(deck: Deck): Promise<CardData> {
    this.current = null;
    return this.getNextPage(deck);
  }

  //GET /decks/{deckId}?page={pageNum}&size={pageSize} returns CardData
  getNextPage(deck: Deck): Promise<CardData> {

    if(this.sending) {
      return Promise.reject('Already sending request.');
    } else {
      this.sending = true;
    }
    
    //Reached end of cards
    if(this.current && !this.current.next) {
      this.sending = false;
      return Promise.reject('No more cards.');
    }

    // let url = `decks/${deck.id}`;
    let url = "assets/json/page1.json";
    if(this.current) {
      url = this.current.next;
    }
    
    return this.http.get(url)
                    .toPromise()
                    .then(response => {
                      let json = response.json() as CardData;
                      this.current = json;
                      this.sending = false;
                      return json;
                    });
  }

  //PUT /decks/{deckId}/{cardId} expects Card returns Card
  updateCard(card: Card): Promise<Card> {
    return Promise.resolve(card);
  }

}
