using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RegisterPlayerToTournamentLambda
{
    public class RegisterEvent
    {
        /// <summary>
        /// Le code d'inscription au tournois
        /// </summary>
        [Required]
        [RegularExpression("[a-z][A-Z][0-9](8)")]
        public string RegisterCode { get; set; }
    }
}
