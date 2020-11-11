// https://magic.wizards.com/fr/content/commander-format

import { Card } from 'mtgsdk-ts';
import { EnhancedCard, DeckListConfig, DeckConfig } from '../types';

export default abstract class BaseDeckType implements DeckListConfig {
  abstract lists: EnhancedCard[][];
  abstract type: string;
  abstract listCount: number;
  abstract listConfig: DeckConfig[];

  abstract hasCommander: boolean;
  abstract commander: Card | null;

  abstract blackListedCards: string[];

  abstract minLands: number | null;
  abstract maxLands: number | null;
  abstract maxCardsPerName: number | null;
  abstract minCards: number | null;
  abstract maxCards: number | null;

  canAddCard(card: Card, listIndex: number): boolean {
    if (listIndex >= this.listCount) return false;

    const GenericFilter = ({
      card,
      listIndex,
      blackListedCards,
      maxCards,
      maxCardsPerName,
      maxLands,
    }: {
      card: Card;
      listIndex: number;
      blackListedCards: string[] | null;
      maxCards: number | null;
      maxCardsPerName: number | null;
      maxLands: number | null;
    }): boolean => {
      const { types, supertypes, legalities, name } = card;
  
      // Legal?
      if (legalities) {
        if(
          legalities.filter(
            ({ format, legality }) => 
              format === this.type && legality === 'Legal').length === 0
        )
          return false
      }
  
      // Blacklisted?
      if (blackListedCards && blackListedCards.includes(name)) return false;
  
      // Do not exceed max card limit
      const allCardsCount = this.lists[listIndex].reduce((sum, { quantity }) => sum + quantity, 0);
      if (maxCards && allCardsCount >= maxCards) return false;
  
      if (types.includes('Land') && supertypes.includes('Basic')) {
        // Check for lands type, check global lands count limit
        if (maxLands && typeof maxLands === 'number') {
          const lands = this.lists[listIndex].filter(({ type }) => type === 'Land');
          const count = lands.reduce((sum, { quantity }) => sum + quantity, 0);
  
          if (count >= maxLands) return false;
        }
      } else {
        // Check for other card to not raise the count limit
        if (maxCardsPerName) {
          const existingCard = this.lists[listIndex].find(({ name }) => name === card.name);
  
          if (existingCard && existingCard.quantity >= maxCardsPerName) return false;
        }
      }
  
      return true;
    }

    // Global check
    if (
      !GenericFilter({
        card,
        listIndex,
        blackListedCards: this.blackListedCards,
        maxCards: this.maxCards,
        maxCardsPerName: this.maxCardsPerName,
        maxLands: this.maxLands,
      })
    )
      return false;

    // Specific deck check
    if(this.listConfig[listIndex]) {
      const { blackListedCards, maxCards, maxCardsPerName, maxLands } = this.listConfig[listIndex];
      if (
        !GenericFilter({
          card,
          listIndex,
          blackListedCards,
          maxCards,
          maxCardsPerName,
          maxLands,
        })
      )
        return false;
    }

    return true;
  }
}
