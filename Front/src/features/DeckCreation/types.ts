import { Card } from 'mtgsdk-ts';

export interface EnhancedCard extends Card {
  // When get from server, will only have ID, so have to load data from the magicthegathering's api
  isLoaded?: boolean;
  quantity: number;
}

export interface MinifyCard {
  id: string;
  name: string;
  quantity: number;
}

export interface DeckFilter {
  minLands: number | null;
  maxLands: number | null;
  maxCardsPerName: number | null;
  minCards: number | null;
  maxCards: number | null;
  blackListedCards: string[] | null;
}

export interface DeckConfig extends DeckFilter {
  name: string;
}

export interface DeckListConfig extends DeckFilter {
  lists: EnhancedCard[][];
  type: string;
  listCount: number;
  listConfig: DeckConfig[];

  hasCommander: boolean;
  commander: Card | null;
  canAddCard: (Card: Card, listIndex: number) => boolean;
}

export interface MinifyDeckListConfig extends DeckFilter {
  lists: MinifyCard[][];
  type: string;
  listConfig: DeckConfig[];
  commander: Card | null;
}

export interface DeckCreation {
  deckListConfig?: DeckListConfig;
  selectedList: number;
  loading?: boolean;
  error?: Error;
  save: {
    loading?: boolean;
    error?: Error;  
  }
  load: {
    loading?: boolean;
    error?: Error;  
  }
}
