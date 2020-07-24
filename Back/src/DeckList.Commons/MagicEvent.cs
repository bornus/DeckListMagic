using System;
using System.Collections.Generic;
using System.Text;

namespace CreateEventLambda
{
    public class MagicEvent
    {
        /// <summary>
        /// Le nom de l'événement
        /// </summary>
        public string EventName { get; set; }

        /// <summary>
        /// Le nom du tournoi
        /// </summary>
        public string TournamentName { get; set; }

        /// <summary>
        /// Le format du tournoi
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// La date de l'evenement
        /// </summary>
        public string Date { get; set; }

        /// <summary>
        /// L'Identifiant de l'évenement
        /// </summary>
        public string EventId { get; set; }

        /// <summary>
        /// L'identifiant du tournois
        /// </summary>
        public string TournamentId { get; set; }
    }
}
