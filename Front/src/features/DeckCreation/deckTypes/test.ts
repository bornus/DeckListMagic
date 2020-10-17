import { Card } from 'mtgsdk-ts';
import { EnhancedCard, Deck } from '../types';

export class Test implements Deck {
  type = 'Test';
  listCount = 2;
  listNames: string[] = ['Main', 'Side'];

  hasCommander = false;

  blackListedCards: string[] = [];

  canAddCard = (card: Card): boolean => {
    // Un seul exemplaire de chaque carte (à l'exception des terrains de base)

    // 9 cartes faisant référence à « playing for ante »
    // 25 cartes avec le type « Conspiracy »

    // Toutes les cartes doivent correspondre à l'identité couleur du commandant
    // colors: ["Green"]

    return true;
  };

  minGround = 0;
  maxGround = 99;
  maxCardsPerName = 10;
  minCards = 99;
  maxCards = 99;
  // lists: EnhancedCard[][] = [[], []];
}
