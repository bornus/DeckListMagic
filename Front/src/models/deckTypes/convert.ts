import { EnhancedCard, DeckListConfig } from '.';
import { DeckConfig as BackDeckConfig, CardInfo } from '../backTypes';
import Modern from './modern';

export const toBackModel = (deck: DeckListConfig): BackDeckConfig => {
  const backModel: BackDeckConfig = {
    Id: deck.id || '',
    Name: deck.name || '',
    Format: deck.type,
  };

  const convert = ({ id, name, quantity }: EnhancedCard): CardInfo => ({ Id: id, Name: name, Quantity: quantity });
  if (deck.mainDeck && deck.mainDeck.length >= 1) {
    backModel.MainDeck = deck.mainDeck.map(convert);
  }

  if (deck.sideDeck && deck.sideDeck.length >= 2) {
    backModel.SideDeck = deck.sideDeck.map(convert);
  }

  return backModel;
};

export const fromBackModel = (deck: BackDeckConfig): DeckListConfig => {
  let clientModel: DeckListConfig;

  switch (deck.Format) {
    case Modern.type:
      clientModel = new Modern({ id: deck.Id, name: deck.Name });
      break;
    default:
      console.error('Unknown deck format');
      throw new Error('Unknown deck format');
  }

  const convert = ({ Id, Name, Quantity }: CardInfo): EnhancedCard => ({
    id: Id,
    name: Name,
    quantity: Quantity,
  });

  if (deck.MainDeck && deck.MainDeck.length > 0) {
    clientModel.mainDeck = deck.MainDeck.map(convert);
  }

  if (deck.SideDeck && deck.SideDeck.length > 0) {
    clientModel.sideDeck = deck.SideDeck.map(convert);
  }

  return clientModel;
};
