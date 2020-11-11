using System;
using System.Collections.Generic;
using System.Text;

namespace DeckList.Commons
{
    public static class Constantes
    {
        public const string TableName = "DeckList";

        public static class TableIndex
        {
            public const string REGISTER_CODE = "TournamentRegisterCode";
        }

        public static class DynamoKey
        {
            public const string EVENT = "EVENT#";
            public const string USER = "USER#";
            public const string DECK = "DECK#";
            public const string TO = "TO#";
            public const string TOURNAMENT = "TOURNAMENT#";
            public const string REGISTER = "REGISTER#";
            public const string DETAIL = "Details";
        }

        public static class DynamoCol
        {
            public const string EVENT_ID = "eventId";
            public const string EVENT_NAME = "eventName";
            public const string TOURNAMENT_ID = "tournamentId";
            public const string TOURNAMENT_NAME = "tournamentName";
            public const string DECK_ID = "deckId";
            public const string DECK_NAME = "deckName";
            public const string FORMAT = "format";
            public const string PK = "pk";
            public const string SK = "sk";
            public const string USER_ID = "userId";
            public const string DATE = "date";
            public const string REGISTER_CODE = "registerCode";
            public const string AUTHOR = "author";
            public const string MAIN_DECK = "mainDeck";
            public const string SIDE_DECK = "sideDeck";
        }
    }
}
