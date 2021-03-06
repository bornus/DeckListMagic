// https://magic.wizards.com/en/game-info/gameplay/formats/modern

import { Card } from 'mtgsdk-ts';
import BaseDeckType from './baseDeckType';
import { EnhancedCard, DeckConfig } from '../deckTypes';

export default class Modern extends BaseDeckType {
  // constructor() {
  //   super();
  //   this.maxCardsPerName = 4;
  //   this.minCards = 60;
  // }

  type = 'Modern';
  static type = 'Modern';
  listCount = 1;
  mainDeck: EnhancedCard[] = [];
  sideDeck: EnhancedCard[] = [];

  mainDeckConfig: DeckConfig | null = null;
  sideDeckConfig: DeckConfig | null = null;

  hasCommander = false;
  commander = null;

  blackListedCards: string[] = [];

  minLands = null;
  maxLands = null;
  maxCardsPerName = 4;
  minCards = 60;
  maxCards = null;

  // canAddCard(card: Card, listIndex: number): boolean {
  //   // Have to add first the commander!
  //   // if (!this.commander) return false;
  //   return super.canAddCard(card, listIndex);

  //   // == LANDS = unlimited
  //   // supertypes	[ "Basic" ]
  //   // types	[ "Land" ]

  //   // No need blacklisted
  //   // legalities	[ { format: "Modern", legality: "Legal" }]

  //   return true;
  // }

  // Side = 15 max
}
