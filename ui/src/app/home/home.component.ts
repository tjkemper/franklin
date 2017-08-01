import { Component, OnInit } from '@angular/core';

import { DeckService } from '../deck.service';
import { CardData, Card } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: Card[] = [];

  constructor(
    private deckService: DeckService
  ) { }

  ngOnInit() {
    this.deckService.getNextPage()
                    .then(cardData => this.cards.push(...cardData.data));
  }

}
