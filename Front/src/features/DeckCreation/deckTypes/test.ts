import { Card } from 'mtgsdk-ts';
import BaseDeckType from './baseDeckType';

export default class Test extends BaseDeckType {
  constructor() {
    super();
  }

  type = 'Test';
  listCount = 2;
  listNames: string[] = ['Main', 'Side'];

  hasCommander = false;

  blackListedCards: string[] = [];

  // canAddCard = (card: Card, listIndex: number): boolean => super.canAddCard(card, listIndex);

  minGround = 0;
  maxGround = 100;
  maxCardsPerName = 10;
  minCards = 100;
  maxCards = 100;
}
