// https://magic.wizards.com/fr/content/commander-format

import { Card } from 'mtgsdk-ts';
import { EnhancedCard, DeckConfig } from '../types';

export class Commander implements DeckConfig {
  type = 'Commandeur';
  listCount = 1;
  listNames: string[] = [];

  hasCommander = true;

  blackListedCards: string[] = [
    'Ancestral Recall',
    'Balance',
    'Biorhythm',
    'Black Lotus',
    'Braids, Cabal Minion',
    'Chaos Orb',
    'Coalition Victory',
    'Channel',
    'Emrakul, the Aeons Torn',
    'Erayo, Soratami Ascendant',
    'Falling Star',
    'Fastbond',
    'Gifts Ungiven',
    'Griselbrand',
    'Iona, Shield of Emeria',
    'Karakas',
    'Leovold, Emissary of Trest',
    'Library of Alexandria',
    'Limited Resources',
    'Mox Emerald',
    'Mox Jet',
    'Mox Pearl',
    'Mox Ruby',
    'Mox Sapphire',
    'Panoptic Mirror',
    'Paradox Engine',
    'Primeval Titan',
    'Prophet of Kruphix',
    'Recurring Nightmare',
    'Rofellos, Llanowar Emissary',
    'Shahrazad',
    'Sundering Titan',
    'Sway of the Stars',
    'Sylvan Primordial',
    'Time Vault',
    'Time Walk',
    'Tinker',
    'Tolarian Academy',
    'Trade Secrets',
    'Upheaval',
    'Worldfire',
    "Yawgmoth's Bargain",
  ];

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
  maxCardsPerName = 1;
  minCards = 99;
  maxCards = 99;
  // lists: EnhancedCard[][] = [[]];
}
