using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using DeckList.Commons;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace CreateEventLambda
{
    public class Function
    {
        public MagicEvent FunctionHandler(MagicEvent magicEvent, ILambdaContext context)
        {
            context.Logger.LogLine($"Beginning to register {magicEvent.EventName} Event.");

            var userUid = context.Identity.IdentityId;
            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);

            Table deckListTable = Table.LoadTable(client, Constantes.TableName);

            Guid eventUid = Guid.NewGuid();
            Guid tournamentUid;
            string registerCode;
            bool find = false;

            var evenement = new Document
            {
                [Constantes.DynamoCol.PK] = $"{Constantes.DynamoKey.EVENT}{eventUid}",
                [Constantes.DynamoCol.EVENT_ID] = $"{eventUid}",
                [Constantes.DynamoCol.EVENT_NAME] = magicEvent.EventName,
                [Constantes.DynamoCol.TOURNAMENT_NAME] = magicEvent.TournamentName,
                [Constantes.DynamoCol.DATE] = magicEvent.Date,
                [Constantes.DynamoCol.FORMAT] = magicEvent.Format,
            };

            Expression expr = new Expression
            {
                ExpressionStatement = "attribute_not_exists(:RC)",
                ExpressionAttributeValues = {[":RC"] = Constantes.DynamoCol.REGISTER_CODE}
            };

            UpdateItemOperationConfig config = new UpdateItemOperationConfig
            {
                ConditionalExpression = expr,
                ReturnValues = ReturnValues.AllNewAttributes
            };

            do
            {
                tournamentUid = Guid.NewGuid();
                registerCode = tournamentUid.ToString().Substring(0, 8);

                evenement[Constantes.DynamoCol.SK] = $"{Constantes.DynamoKey.EVENT}{eventUid}#{Constantes.DynamoKey.TOURNAMENT}{tournamentUid}";
                evenement[Constantes.DynamoCol.TOURNAMENT_ID] = $"{tournamentUid}";
                evenement[Constantes.DynamoCol.REGISTER_CODE] = registerCode;
                var tournamentCreation = deckListTable.UpdateItemAsync(evenement, config);
                tournamentCreation.Wait();
                find = tournamentCreation.IsCompletedSuccessfully;
            } while (find);

            magicEvent.EventId = eventUid.ToString();
            magicEvent.TournamentId = tournamentUid.ToString();
            magicEvent.RegisterCode = registerCode;

            var evenementTo = new Document
            {
                [Constantes.DynamoCol.PK] = $"TO#{userUid}",
                [Constantes.DynamoCol.SK] = $"EVENT#{eventUid}",
                [Constantes.DynamoCol.EVENT_ID] = $"{eventUid}",
                [Constantes.DynamoCol.USER_ID] = $"{userUid}"
            };

            var eventToCreation = deckListTable.UpdateItemAsync(evenementTo);
            eventToCreation.Wait();

            context.Logger.LogLine("Stream processing complete.");

            var headersDic = new Dictionary<string, string> {{"Content-type", "application/json"}};

            return magicEvent;
            //return new APIGatewayProxyResponse()
            //{
            //    StatusCode = 201,
            //    Headers = headersDic,
            //    // return the image in Base64 encoding
            //    Body = JsonConvert.SerializeObject(magicEvent) //Convert.ToBase64String(reader.ReadBytes(Convert.ToInt32(responseStream.Length))),
            //};
        }
    }
}