// https://magic.wizards.com/fr/content/commander-format

import { Card } from 'mtgsdk-ts';
import { EnhancedCard, DeckListConfig, DeckConfig } from '.';
import { DeckConfig as BackDeckConfig, CardInfo } from '../backTypes';
import Mordern from './modern';
import Modern from './modern';

export default abstract class BaseDeckType implements DeckListConfig {
  constructor({ id = "", name }: { id?: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  id: string;
  name: string;
  abstract mainDeck: EnhancedCard[];
  abstract sideDeck: EnhancedCard[];
  abstract type: string;
  abstract mainDeckConfig: DeckConfig | null;
  abstract sideDeckConfig: DeckConfig | null;

  abstract blackListedCards: string[];

  abstract minLands: number | null;
  abstract maxLands: number | null;
  abstract maxCardsPerName: number | null;
  abstract minCards: number | null;
  abstract maxCards: number | null;

  canAddCardToMainDeck(card: Card): boolean {
    return this.canAddCard(card, this.mainDeck, this.mainDeckConfig)
  }

  canAddCardToSideDeck(card: Card): boolean {
    return this.canAddCard(card, this.sideDeck, this.sideDeckConfig)
  }

  canAddCard(card: Card, deck: EnhancedCard[], config: DeckConfig | null): boolean {
    const GenericFilter = ({
      card,
      deck,
      blackListedCards,
      maxCards,
      maxCardsPerName,
      maxLands,
    }: {
      card: Card;
      deck: EnhancedCard[];
      blackListedCards: string[] | null;
      maxCards: number | null;
      maxCardsPerName: number | null;
      maxLands: number | null;
    }): boolean => {
      const { types, supertypes, legalities, name } = card;

      // Legal?
      if (legalities) {
        if (legalities.filter(({ format, legality }) => format === this.type && legality === 'Legal').length === 0)
          return false;
      }

      // Blacklisted?
      if (blackListedCards && blackListedCards.includes(name)) return false;

      // Do not exceed max card limit
      const allCardsCount = deck.reduce((sum, { quantity }) => sum + quantity, 0);
      if (maxCards && allCardsCount >= maxCards) return false;

      if (types.includes('Land') && supertypes.includes('Basic')) {
        // Check for lands type, check global lands count limit
        if (maxLands && typeof maxLands === 'number') {
          const lands = deck.filter(({ type }) => type === 'Land');
          const count = lands.reduce((sum, { quantity }) => sum + quantity, 0);

          if (count >= maxLands) return false;
        }
      } else {
        // Check for other card to not raise the count limit
        if (maxCardsPerName) {
          const existingCard = deck.find(({ name }) => name === card.name);

          if (existingCard && existingCard.quantity >= maxCardsPerName) return false;
        }
      }

      return true;
    };

    // Global check
    if (
      !GenericFilter({
        card,
        deck,
        blackListedCards: this.blackListedCards,
        maxCards: this.maxCards,
        maxCardsPerName: this.maxCardsPerName,
        maxLands: this.maxLands,
      })
    )
      return false;

    // Specific deck check
    if (config) {
      const { blackListedCards, maxCards, maxCardsPerName, maxLands } = config;
      if (
        !GenericFilter({
          card,
          deck,
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
