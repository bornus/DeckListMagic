import { DeckListConfig } from 'models/deckTypes';

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
