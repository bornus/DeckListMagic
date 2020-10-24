// https://magic.wizards.com/fr/content/commander-format

import { Card } from 'mtgsdk-ts';
import { EnhancedCard, DeckConfig } from '../types';

export default class BaseDeckType implements DeckConfig {
  constructor() {
    this.lists = Array(this.listCount).fill([]);
  }

  lists: EnhancedCard[][];
  type = 'nohting';
  listCount = 1;
  listNames: string[] = [];

  hasCommander = false;

  blackListedCards: string[] = [];

  canAddCard = (card: Card, listIndex: number): boolean => {
    if (listIndex >= this.listCount) return false;

    const { types, name } = card;

    // Blacklisted?
    if (this.blackListedCards.includes(name)) return false;

    if (types.includes('Land')) {
      // Check for lands type, check global lands count limit
      const lands = this.lists[listIndex].filter(({ type }) => type === 'Land');
      const count = lands.reduce((sum, { quantity }) => sum + quantity, 0);

      if (count + 1 >= this.maxGround) return false;
    } else {
      // Check for other card to not raise the count limit
      const existingCard = this.lists[listIndex].find(({ name }) => name === card.name);
      if (existingCard && existingCard.quantity + 1 >= this.maxCards) return false;
    }

    return true;
  };

  minGround = 0;
  maxGround = 100;
  maxCardsPerName = 10;
  minCards = 100;
  maxCards = 100;
}
