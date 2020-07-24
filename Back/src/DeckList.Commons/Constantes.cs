using System;
using System.Collections.Generic;
using System.Text;

namespace DeckList.Commons
{
    public static class Constantes
    {
        public static class DynamoKey
        {
            public const string EVENT = "EVENT#";
            public const string USER = "USER#";
            public const string TO = "TO#";
            public const string TOURNAMENT = "TOURNAMENT#";
            public const string REGISTER = "Register#";
            public const string DETAIL = "Details";
        }

        public static class DynamoCol
        {
            public const string EVENT_ID = "eventId";
            public const string TOURNAMENT_ID = "tournamentId";
        }
    }
}
