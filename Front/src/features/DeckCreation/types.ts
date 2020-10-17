import { Card } from 'mtgsdk-ts';

export interface EnhancedCard extends Card {
  // When get from server, will only have ID, so have to load data from the magicthegathering's api
  isLoaded?: boolean;
  quantity: number;
}

export interface DeckConfig {
  type: string;
  listCount: number;
  // lists: EnhancedCard[][];
  listNames: string[];

  hasCommander: boolean;
  canAddCard: (Card: Card) => boolean;
  minGround: number | null;
  maxGround: number | null;
  maxCardsPerName: number | null;
  minCards: number | null;
  maxCards: number | null;
}

// export interface Deck {
//   type: string;
//   selected: SelectedDeck;

//   mainDeck: EnhancedCard[];
//   sideDeck: EnhancedCard[];
// }

export interface DeckCreation {
  deckConfig?: DeckConfig;
  lists: EnhancedCard[][];
  selectedList: number;
  loading?: boolean;
  error?: Error;
}
