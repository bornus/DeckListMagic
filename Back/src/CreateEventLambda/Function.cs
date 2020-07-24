using System;
using System.Collections.Generic;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using DeckList.Commons;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace CreateEventLambda
{
    public class Function
    {
        public APIGatewayProxyResponse FunctionHandler(MagicEvent magicEvent, ILambdaContext context)
        {
            context.Logger.LogLine($"Beginning to register {magicEvent.EventName} Event.");

            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);

            Table deckListTable = Table.LoadTable(client, "DeckList");
            var batchWrite = deckListTable.CreateBatchWrite();

            Guid eventUid =Guid.NewGuid();
            Guid tournamentUid = Guid.NewGuid();

            var evenement = new Document();
            evenement["pk"] = $"{Constantes.DynamoKey.EVENT}{eventUid}";
            evenement["sk"] = $"{Constantes.DynamoKey.EVENT}{eventUid}#{Constantes.DynamoKey.TOURNAMENT}{tournamentUid}";
            evenement["eventId"] = $"{eventUid}";
            evenement["tournamentId"] = $"{tournamentUid}";
            evenement["eventName"] = magicEvent.EventName;
            evenement["tournamentName"] = magicEvent.TournamentName;
            evenement["date"] = magicEvent.Date;
            evenement["format"] = magicEvent.Format;

            magicEvent.EventId = eventUid.ToString();
            magicEvent.TournamentId = tournamentUid.ToString();

            var userUid = "45e9452f-1023-49fc-a84c-3466ae37ce5a";

            var evenementTo = new Document();
            evenementTo["pk"] = $"TO#{userUid}";
            evenementTo["sk"] = $"EVENT#{eventUid}";
            evenementTo["eventId"] = $"{eventUid}";
            evenementTo["userId"] = $"{userUid}";

            batchWrite.AddDocumentToPut(evenement);
            batchWrite.AddDocumentToPut(evenementTo);

            var batch = batchWrite.ExecuteAsync();
            batch.Wait();

            context.Logger.LogLine("Stream processing complete.");

            var headersDic = new Dictionary<string, string>();
            headersDic.Add("Content-type", "application/json");

            return new APIGatewayProxyResponse()
            {
                StatusCode = 201,
                Headers = headersDic,
                // return the image in Base64 encoding
                Body = JsonConvert.SerializeObject(magicEvent) //Convert.ToBase64String(reader.ReadBytes(Convert.ToInt32(responseStream.Length))),
            };
        }
    }
}