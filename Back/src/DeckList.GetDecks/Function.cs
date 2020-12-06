using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.Core;
using DeckList.Commons;
using Newtonsoft.Json;
using System.Collections.Generic;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]


namespace DeckList.GetDecks
{
    public class RequestFilter
    {
        public string filter { get; set; }
    }

    public class Function
    {
        /// <summary>
        /// Returns all player's decklist
        /// </summary>
        /// <param name="request">Request from gateway</param>
        /// <param name="context"></param>
        /// <returns>All deck list</returns>
        public List<Deck> FunctionHandler(AwsGetRequest<RequestFilter> request, ILambdaContext context)
        {
            //context.Logger.LogLine($"Context: {JsonConvert.SerializeObject(context)}");
            //context.Logger.LogLine($"Filter: {JsonConvert.SerializeObject(filter)}");

            var userUid = request.context.userId;
            context.Logger.LogLine($"Beginning to get all deck of user {userUid}.");

            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
            Table deckListTable = Table.LoadTable(client, Constantes.TableName);
            QueryFilter playerFilter = new QueryFilter();
            playerFilter.AddCondition(Constantes.DynamoCol.PK, QueryOperator.Equal, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.USER}{userUid}") });
            playerFilter.AddCondition(Constantes.DynamoCol.SK, QueryOperator.BeginsWith, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.DECK}") });
            Search search = deckListTable.Query(playerFilter);

            List<Deck> decks = new List<Deck>();

            do
            {
                var set = search.GetNextSetAsync();
                set.Wait();
                foreach (var deckDoc in set.Result)
                {
                    var deck = new Deck
                    {
                        Id = deckDoc[Constantes.DynamoCol.DECK_ID],
                        Name = deckDoc[Constantes.DynamoCol.DECK_NAME],
                        Format = deckDoc[Constantes.DynamoCol.FORMAT],
                        Author = deckDoc[Constantes.DynamoCol.AUTHOR],
                        LastUpdatedAt = deckDoc[Constantes.DynamoCol.DATE].AsDateTime(),
                        MainDeck = JsonConvert.DeserializeObject<List<CardInfo>>(deckDoc[Constantes.DynamoCol.MAIN_DECK]),
                        SideDeck = JsonConvert.DeserializeObject<List<CardInfo>>(deckDoc[Constantes.DynamoCol.SIDE_DECK]),
                    };

                    decks.Add(deck);
                }
            } while (!search.IsDone);

            context.Logger.LogLine("Stream processing complete.");

            var headersDic = new Dictionary<string, string> { { "Content-type", "application/json" } };

            return decks;
        }
    }
}
