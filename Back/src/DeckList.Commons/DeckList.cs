using System;
using System.Collections.Generic;
using System.Text;

namespace CreateEventLambda
{
    public class DeckList
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Format { get; set; }
        public string Author { get; set; }
        public string PlayerId { get; set; }
        public DateTime LastUpdatedAt { get; set; }

        public List<CardInfo> MainDeck { get; set; }
        public List<CardInfo> SideDeck { get; set; }
    }
}
