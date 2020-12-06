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
    public class RequestModel
    {
        public string id { get; set; }
    }

    public class Function
    {

        /// <summary>
        /// Return the decklist
        /// </summary>
        /// <param name="guid">Guid of the wanted guid</param>
        /// <param name="context"></param>
        /// <returns>All deck list</returns>
        public Deck FunctionHandler(AwsGetRequest<RequestModel> request, ILambdaContext context)
        {
            var guid = request.parameters.id;
            var userUid = request.context.userId;
            context.Logger.LogLine($"Beginning to get Deck {guid}.");

            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
            Table deckListTable = Table.LoadTable(client, Constantes.TableName);
            QueryFilter playerFilter = new QueryFilter();
            playerFilter.AddCondition(Constantes.DynamoCol.PK, QueryOperator.Equal, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.USER}{userUid}") });
            playerFilter.AddCondition(Constantes.DynamoCol.SK, QueryOperator.BeginsWith, new List<AttributeValue> { new AttributeValue($"{Constantes.DynamoKey.DECK}") });

            Primitive PK = new Primitive($"{Constantes.DynamoKey.USER}{userUid}");
            Primitive SK = new Primitive($"{Constantes.DynamoKey.DECK}{guid}");
            var getItem = deckListTable.GetItemAsync(PK, SK);
            getItem.Wait();

            Deck deck = new Deck
            {
                Id = getItem.Result[Constantes.DynamoCol.DECK_ID],
                Name = getItem.Result[Constantes.DynamoCol.DECK_NAME],
                Format = getItem.Result[Constantes.DynamoCol.FORMAT],
                Author = getItem.Result[Constantes.DynamoCol.AUTHOR],
                LastUpdatedAt = getItem.Result[Constantes.DynamoCol.DATE].AsDateTime(),
                MainDeck = JsonConvert.DeserializeObject<List<CardInfo>>(getItem.Result[Constantes.DynamoCol.MAIN_DECK]),
                SideDeck = JsonConvert.DeserializeObject<List<CardInfo>>(getItem.Result[Constantes.DynamoCol.SIDE_DECK]),
            };

            context.Logger.LogLine("Stream processing complete.");

            return deck;
        }
    }
}
