import { Card } from 'mtgsdk-ts';

export interface EnhancedCard extends Card {
  // When get from server, will only have ID, so have to load data from the magicthegathering's api
  isLoaded?: boolean;
}

export interface Deck {
  type: string;
  mainDeck: EnhancedCard[];
  sideDeck: EnhancedCard[];
}

export interface DeckCreation {
  deck?: Deck;
  loading?: boolean;
  error?: Error;
}
