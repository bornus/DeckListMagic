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

namespace RegisterPlayerToTournamentLambda
{
    public class Function
    {

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="register">Les infos d'inscriptions au tournoi</param>
        /// <param name="context"></param>
        /// <returns></returns>
        public APIGatewayProxyResponse FunctionHandler(RegisterEvent register, ILambdaContext context)
        {
            var userUid = "45e9452f-1023-49fc-a84c-3466ae37ce5a";
            using var client = new AmazonDynamoDBClient(Amazon.RegionEndpoint.EUWest1);

            Table deckListTable = Table.LoadTable(client, Constantes.TableName);
            var batchWrite = deckListTable.CreateBatchWrite();

            QueryRequest req = new QueryRequest
            {
                TableName = Constantes.TableName,
                IndexName = Constantes.TableIndex.REGISTER_CODE,
                KeyConditionExpression = $"{Constantes.DynamoCol.REGISTER_CODE} = :v_registerCode",
                ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                    {":v_registerCode", new AttributeValue {
                        S = register.RegisterCode
                    }}
                }
            };
            Task<QueryResponse> search = client.QueryAsync(req);
            search.Wait();

            var tournamentDoc = search.Result.Items.First();

            var tournamentRegistration = new TournamentRegistration
            {
                EventId = tournamentDoc[Constantes.DynamoCol.EVENT_ID].S,
                EventName = tournamentDoc[Constantes.DynamoCol.EVENT_NAME].S,
                TournamentId = tournamentDoc[Constantes.DynamoCol.TOURNAMENT_ID].S,
                TournamentName = tournamentDoc[Constantes.DynamoCol.TOURNAMENT_NAME].S,
                TournamentFormat = tournamentDoc[Constantes.DynamoCol.FORMAT].S,
                UserId = userUid
            };


            var registration = new Document
            {
                [Constantes.DynamoCol.PK] = $"{Constantes.DynamoKey.USER}{userUid}",
                [Constantes.DynamoCol.SK] = $"{Constantes.DynamoKey.REGISTER}{tournamentRegistration.EventId}#{Constantes.DynamoKey.TOURNAMENT}{tournamentRegistration.TournamentId}",
                [Constantes.DynamoCol.EVENT_ID] = $"{tournamentRegistration.EventId}",
                [Constantes.DynamoCol.TOURNAMENT_ID] = $"{tournamentRegistration.TournamentId}",
                [Constantes.DynamoCol.USER_ID] = userUid,
            };

            batchWrite.AddDocumentToPut(registration);

            var batch = batchWrite.ExecuteAsync();
            batch.Wait();

            context.Logger.LogLine("SRegistration complete.");

            var headersDic = new Dictionary<string, string> { { "Content-type", "application/json" } };

            return new APIGatewayProxyResponse()
            {
                StatusCode = 201,
                Headers = headersDic,
                // return the image in Base64 encoding
                Body = JsonConvert.SerializeObject(tournamentRegistration) //Convert.ToBase64String(reader.ReadBytes(Convert.ToInt32(responseStream.Length))),
            };
        }
    }
}
