using System.Collections.Generic;
using Amazon.CDK;
using Amazon.CDK.AWS.APIGateway;
using Amazon.CDK.AWS.Lambda;
using Amazon.CDK.AWS.S3;

namespace CdkAvatar
{
    public class CdkDeckListMagicStack : Stack
    {
        internal CdkDeckListMagicStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            var bucket = Bucket.FromBucketArn(this, "bornusS3", "arn:aws:s3:::bornus");

            // The code that defines your stack goes here
            Function fn = new Function(this, "GetAvatar", new FunctionProps
            {
                Runtime = Runtime.DOTNET_CORE_3_1,
                Code = Code.FromAsset("./GetAvatar/bin/Release/netcoreapp3.1/GetAvatar.zip"),
                Handler = "GetAvatar::GetAvatar.Function::FunctionHandler",
                Timeout = Duration.Seconds(30),
                Environment = new Dictionary<string, string>
                {
                    {"BUCKET", bucket.BucketName}
                }
            });

            bucket.GrantRead(fn);

            var api = new RestApi(this, "Avatar", new RestApiProps
            {
                RestApiName = "Avatar",
                Description = "Avatar's services",
                BinaryMediaTypes = new []{"*/*"},
            });

            var getWidgetsIntegration = new LambdaIntegration(fn, new LambdaIntegrationOptions
            {
                RequestTemplates = new Dictionary<string, string>{
                    { "application/json", "{ 'statusCode', '200'}" }
                },
            });

            api.Root.AddMethod("GET", getWidgetsIntegration);

            //var widget = api.Root.AddResource("{id}");

        }
    }
}
