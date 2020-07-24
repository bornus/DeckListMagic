using Amazon.Lambda.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.APIGatewayEvents;
using DeckList.Commons;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace GetPlayerTournament
{
    public class Function
    {
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        ///
        /// To use this handler to respond to an AWS event, reference the appropriate package from 
        /// https://github.com/aws/aws-lambda-dotnet#events
        /// and change the string input parameter to the desired event type.
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
            playerFilter.AddCondition("pk", QueryOperator.Equal, new List<AttributeValue>{new AttributeValue($"{Constantes.DynamoKey.USER}{userUid}")});
            playerFilter.AddCondition("sk", QueryOperator.BeginsWith, new List<AttributeValue>{new AttributeValue($"{Constantes.DynamoKey.REGISTER}") });
            Search search = deckListTable.Query(playerFilter);
            List<Tournament> tournaments = new List<Tournament>();
            do
            {
                var set  = search.GetNextSetAsync();
                set.Wait();
                foreach (var document in set.Result)
                {
                    var tournament = GetTournamentInfos(document, deckListTable);
                    if (tournament != null)
                    {
                        tournaments.Add(tournament);
                    }
                }
            } while (!search.IsDone);

            context.Logger.LogLine("Stream processing complete.");

            var headersDic = new Dictionary<string, string>();
            headersDic.Add("Content-type", "application/json");

            return new APIGatewayProxyResponse()
            {
                StatusCode = 201,
                Headers = headersDic,
                // return the image in Base64 encoding
                Body = JsonConvert.SerializeObject(tournaments)
            };
        }

        private Tournament GetTournamentInfos(Document registerDoc, Table deckListTable)
        {
            if (!registerDoc.GetAttributeNames().Contains(Constantes.DynamoCol.EVENT_ID) ||
                !registerDoc.GetAttributeNames().Contains(Constantes.DynamoCol.TOURNAMENT_ID))
            {
                return null;
            }

            Primitive pk = new Primitive($"{Constantes.DynamoKey.EVENT}{registerDoc[Constantes.DynamoCol.EVENT_ID]}");
            Primitive sk = new Primitive($"{Constantes.DynamoKey.EVENT}{registerDoc[Constantes.DynamoCol.EVENT_ID]}#{Constantes.DynamoKey.TOURNAMENT}{registerDoc[Constantes.DynamoCol.TOURNAMENT_ID]}");
            var tournamentInfo = deckListTable.GetItemAsync(pk, sk);
            tournamentInfo.Wait();

            var document = tournamentInfo.Result;

            var tournament = new Tournament();

            foreach (var attribute in document.GetAttributeNames())
            {
                string stringValue = null;
                var value = document[attribute];
                if (value is Primitive)
                    stringValue = value.AsPrimitive().Value.ToString();
                else if (value is PrimitiveList)
                    stringValue = string.Join(",", (from primitive
                            in value.AsPrimitiveList().Entries
                        select primitive.Value).ToArray());
                Console.WriteLine("{0} - {1}", attribute, stringValue);
            }

            throw new NotImplementedException();
        }
    }
}
