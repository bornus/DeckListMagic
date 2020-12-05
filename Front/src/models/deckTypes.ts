import { Card as RefCard } from 'mtgsdk-ts';

export declare enum Color {
  White = 0,
  Blue = 1,
  Black = 2,
  Red = 3,
  Green = 4,
}
export declare enum ColorIdentity {
  W = 0,
  U = 1,
  B = 2,
  R = 3,
  G = 4,
}
export declare enum Rarity {
  "Basic Land" = 0,
  Common = 1,
  Uncommon = 2,
  "Mythic Rare" = 3,
  Timeshifted = 4,
  Masterpiece = 5,
}
export declare enum Layout {
  normal = 0,
  split = 1,
  flip = 2,
  "double-faced" = 3,
  token = 4,
  plane = 5,
  scheme = 6,
  phenomenon = 7,
  leveler = 8,
  vanguard = 9,
}
export declare enum Legality {
  Legal = 0,
  Banned = 1,
  Restricted = 2,
}
export interface BlockLegality {
  format: string;
  legality: keyof typeof Legality;
}

export interface Card {
  name: string;
  manaCost?: string;
  cmc?: number;
  colors?: (keyof typeof Color)[];
  colorIdentity?: (keyof typeof ColorIdentity)[];
  type?: string;
  supertypes?: string[];
  types?: string[];
  subtypes?: string[];
  rarity?: keyof typeof Rarity;
  set?: string;
  setName?: string;
  artist?: string;
  flavor?: string;
  layout?: keyof typeof Layout;
  multiverseid?: number;
  imageUrl?: string;
  variations?: number[];
  printings?: string[];
  originalText?: string;
  originalType?: string;
  legalities?: BlockLegality[];
  id: string;
}

export interface EnhancedCard extends Card {
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
  id?: string;
  name?: string;

  mainDeck: EnhancedCard[];
  sideDeck: EnhancedCard[];
  type: string;
  mainDeckConfig: DeckConfig | null;
  sideDeckConfig: DeckConfig | null;

  canAddCardToMainDeck(card: Card): boolean
  canAddCardToSideDeck(card: Card): boolean
  canAddCard: (card: RefCard, deck: EnhancedCard[], config: DeckConfig) => boolean;
}
