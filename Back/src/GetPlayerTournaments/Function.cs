using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using DeckList.Commons;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace GetPlayerTournaments
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public APIGatewayProxyResponse FunctionHandler(ILambdaContext context)
        {
            var userUid = "45e9452f-1023-49fc-a84c-3466ae37ce5a";
            context.Logger.LogLine($"Beginning to search event for player {userUid} Event.");

            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);

            Table deckListTable = Table.LoadTable(client, "DeckList");
            QueryFilter playerFilter = new QueryFilter();
            playerFilter.AddCondition(Constantes.DynamoCol.PK, QueryOperator.Equal, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.USER}{userUid}") });
            playerFilter.AddCondition(Constantes.DynamoCol.SK, QueryOperator.BeginsWith, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.REGISTER}") });
            Search search = deckListTable.Query(playerFilter);
            List<Tournament> tournaments = new List<Tournament>();

            List<AttributeValue> pkValues = new List<AttributeValue>();
            List<AttributeValue> skValues = new List<AttributeValue>();
            do
            {
                var set = search.GetNextSetAsync();
                set.Wait();
                foreach (var registerDoc in set.Result)
                {
                    if (registerDoc.GetAttributeNames().Contains(Constantes.DynamoCol.EVENT_ID) &&
                        registerDoc.GetAttributeNames().Contains(Constantes.DynamoCol.TOURNAMENT_ID))
                    {
                        pkValues.Add(new AttributeValue($"{Constantes.DynamoKey.EVENT}{registerDoc[Constantes.DynamoCol.EVENT_ID]}"));
                        skValues.Add(new AttributeValue($"{Constantes.DynamoKey.EVENT}{registerDoc[Constantes.DynamoCol.EVENT_ID]}#{Constantes.DynamoKey.TOURNAMENT}{registerDoc[Constantes.DynamoCol.TOURNAMENT_ID]}"));
                    }
                }
            } while (!search.IsDone);

            if (pkValues.Any())
            {
                QueryFilter tournamentFilter = new QueryFilter();
                tournamentFilter.AddCondition(Constantes.DynamoCol.PK, QueryOperator.Equal, pkValues);
                tournamentFilter.AddCondition(Constantes.DynamoCol.SK, QueryOperator.Equal, skValues);
                Search searchtournaments = deckListTable.Query(tournamentFilter);

                do
                {
                    var set = searchtournaments.GetNextSetAsync();
                    set.Wait();
                    foreach (var tournamentDoc in set.Result)
                    {
                        var tournament = new Tournament
                        {
                            EventId = tournamentDoc[Constantes.DynamoCol.EVENT_ID],
                            EventName = tournamentDoc[Constantes.DynamoCol.EVENT_NAME],
                            TournamentId = tournamentDoc[Constantes.DynamoCol.TOURNAMENT_ID],
                            TournamentName = tournamentDoc[Constantes.DynamoCol.TOURNAMENT_NAME],
                            TournamentFormat = tournamentDoc[Constantes.DynamoCol.FORMAT]
                        };

                        tournaments.Add(tournament);
                    }
                } while (!search.IsDone);
            }

            context.Logger.LogLine("Stream processing complete.");

            var headersDic = new Dictionary<string, string> { { "Content-type", "application/json" } };

            return new APIGatewayProxyResponse()
            {
                StatusCode = 200,
                Headers = headersDic,
                // return the image in Base64 encoding
                Body = JsonConvert.SerializeObject(tournaments)
            };
        }
    }
}
