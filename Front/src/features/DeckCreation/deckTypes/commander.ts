// https://magic.wizards.com/fr/content/commander-format

// import { Card } from 'mtgsdk-ts';
// import BaseDeckType from './baseDeckType';

export default class Commander {}

// export default class Commander extends BaseDeckType {
//   constructor() {
//     super();
//   }

//   // minLands = 0;
//   // maxLands = 99;
//   // maxCardsPerName = 1;
//   // minCards = 99;
//   // maxCards = 99;

//   type = 'Commander';
//   listCount = 1;
//   listNames: string[] = [];

//   hasCommander = true;
//   commander = null;

//   blackListedCards: string[] = [
//     'Ancestral Recall',
//     'Balance',
//     'Biorhythm',
//     'Black Lotus',
//     'Braids, Cabal Minion',
//     'Chaos Orb',
//     'Coalition Victory',
//     'Channel',
//     'Emrakul, the Aeons Torn',
//     'Erayo, Soratami Ascendant',
//     'Falling Star',
//     'Fastbond',
//     'Gifts Ungiven',
//     'Griselbrand',
//     'Iona, Shield of Emeria',
//     'Karakas',
//     'Leovold, Emissary of Trest',
//     'Library of Alexandria',
//     'Limited Resources',
//     'Mox Emerald',
//     'Mox Jet',
//     'Mox Pearl',
//     'Mox Ruby',
//     'Mox Sapphire',
//     'Panoptic Mirror',
//     'Paradox Engine',
//     'Primeval Titan',
//     'Prophet of Kruphix',
//     'Recurring Nightmare',
//     'Rofellos, Llanowar Emissary',
//     'Shahrazad',
//     'Sundering Titan',
//     'Sway of the Stars',
//     'Sylvan Primordial',
//     'Time Vault',
//     'Time Walk',
//     'Tinker',
//     'Tolarian Academy',
//     'Trade Secrets',
//     'Upheaval',
//     'Worldfire',
//     "Yawgmoth's Bargain",
//   ];

//   canAddCard = (card: Card, listIndex: number): boolean => {
//     // Have to add first the commander!
//     if (!this.commander) return false;

//     // if (!super.canAddCard(card, listIndex)) return false;

//     // if (this.commander !== null) console.log(this.commander.colors);

//     // Un seul exemplaire de chaque carte (à l'exception des terrains de base)

//     // Toutes les cartes doivent correspondre à l'identité couleur du commandant
//     // colors: ["Green"]

//     return true;
//   };
// }
