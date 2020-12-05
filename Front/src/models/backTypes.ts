export type CardInfo = {
  Id: string;
  Name: string;
  Quantity: number;
}

export type DeckConfig = {
  Id: string;
  Name: string;
  Format: string;

  Author?: string;
  PlayerId?: string;
  LastUpdatedAt?: Date;
  
  MainDeck?: CardInfo[];
  SideDeck?: CardInfo[];
}
