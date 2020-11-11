namespace DeckList.Commons
{
    public class Tournament
    {
        /// <summary>
        /// L'Identifiant de l'évenement
        /// </summary>
        public string EventId { get; set; }

        /// <summary>
        /// L'identifiant du tournois
        /// </summary>
        public string TournamentId { get; set; }

        /// <summary>
        /// Le nom de l'évenement
        /// </summary>
        public string EventName { get; set; }

        /// <summary>
        /// Le nom du tournois
        /// </summary>
        public string TournamentName { get; set; }

        /// <summary>
        /// Le format du tournois
        /// </summary>
        public string TournamentFormat { get; set; }
    }
}
