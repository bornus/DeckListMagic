export interface Card {
  id: string;
  name: string;
  manaCost: string;
  cmc: number;
  colors: string[];
  colorIdentity: string[];
  type: string;
  supertypes: string[];
  types: string[];
  subtypes: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  flavor: string;
  artist: string;
  number: string;
  layout: string;
  multiverseid: number;
  imageUrl: string;
  variations: string[];
  rulings: any[];
  foreignNames: string[];
  printings: string[];
  originalText: string;
  originalType: string;
  legalities: any[];
}

export interface SearchCards {
  cardsFound: Card[];
  loading?: boolean;
  error?: Error;
}

export interface Error {
  code: string;
  name: string;
  message: string;
}

// export interface CardSearchHeader {
//   count: string;
//   link: string;
//   'page-size': string;
//   'ratelimit-limit': string;
//   'ratelimit-remaining': string;
//   'total-count': string;
// }

// export interface CardSearchServerResponse {
//   status: number;
//   statusText: string;
//   // total_cards: number;
//   // has_more: boolean;
//   // next_page: string;
//   data: Card[];
// }
