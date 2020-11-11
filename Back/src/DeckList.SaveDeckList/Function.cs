using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using DeckList.Commons;
using Newtonsoft.Json;
using System;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace CreateEventLambda
{
    public class Function
    {
        public DeckList FunctionHandler(DeckList deckList, ILambdaContext context)
        {
            context.Logger.LogLine($"Beginning to register {deckList.Name} DeckList.");

            var userUid = context.Identity.IdentityId;
            deckList.PlayerId = userUid;

            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);
            Table deckListTable = Table.LoadTable(client, Constantes.TableName);

            deckList.Id = string.IsNullOrWhiteSpace(deckList.Id) ? Guid.NewGuid().ToString() : deckList.Id;
            var deckListDto = new Document
            {
                [Constantes.DynamoCol.PK] = $"{Constantes.DynamoKey.USER}{userUid}",
                [Constantes.DynamoCol.SK] = $"{Constantes.DynamoKey.DECK}{deckList.Id}",
                [Constantes.DynamoCol.DECK_ID] = $"{deckList.Id}",
                [Constantes.DynamoCol.DECK_NAME] = deckList.Name,
                [Constantes.DynamoCol.FORMAT] = deckList.Format,
                [Constantes.DynamoCol.DATE] = DateTime.Now,
                [Constantes.DynamoCol.AUTHOR] = deckList.Author,
                [Constantes.DynamoCol.USER_ID] = deckList.PlayerId,
                [Constantes.DynamoCol.MAIN_DECK] = JsonConvert.SerializeObject(deckList.MainDeck),
                [Constantes.DynamoCol.SIDE_DECK] = JsonConvert.SerializeObject(deckList.SideDeck),
            };

            deckListTable.PutItemAsync(deckListDto).Wait();

            context.Logger.LogLine("Stream processing complete.");

            return deckList;
        }
    }
}