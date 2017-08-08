import { Component, OnInit } from '@angular/core';

import { DeckService } from '../deck.service';
import { DeckStoreService } from '../deck-store.service';
import { CardData, Card } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: Card[] = [];
  more: boolean = true;

  constructor(
    private deckService: DeckService,
    private deckStoreService: DeckStoreService
  ) { }

  ngOnInit() {
    this.deckStoreService.decks().subscribe(deck => {
      console.log('Deck changed. Go get first page.', deck);
      this.deckService.getFirstPage(this.deckStoreService.deck)
                      .then(cardData => {
                        console.log('Got first page.');
                        this.cards = [];
                        this.cards.push(...cardData.data);
                        this.cards[0].current = true;
                      });
    });
  }

  getNextPage() {
    console.log('Go get next page.');
    this.deckService.getNextPage(this.deckStoreService.deck)
                    .then(cardData => {
                      console.log('Got next page.');
                      this.cards.push(...cardData.data);
                    })
                    .catch((ex) => {
                      console.error('Error fetching next page.', ex);
                      if(ex === 'No more cards.') {
                        this.more = false;
                      }
                    });
  }

}
