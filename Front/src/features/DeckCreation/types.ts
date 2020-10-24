import { Card } from 'mtgsdk-ts';

export interface EnhancedCard extends Card {
  // When get from server, will only have ID, so have to load data from the magicthegathering's api
  isLoaded?: boolean;
  quantity: number;
}

export interface DeckConfig {
  lists: EnhancedCard[][];
  type: string;
  listCount: number;
  listNames: string[];

  hasCommander: boolean;

  canAddCard: (Card: Card, listIndex: number) => boolean;
  minGround: number;
  maxGround: number;
  maxCardsPerName: number;
  minCards: number;
  maxCards: number;
}

export interface DeckCreation {
  deckConfig?: DeckConfig;
  selectedList: number;
  loading?: boolean;
  error?: Error;
}
