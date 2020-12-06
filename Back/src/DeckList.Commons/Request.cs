namespace DeckList.Commons
{
    public class DefaultContent { };
    public class DefaultParameters { };
    public class DefaultStageVariables { };

    public class AwsEmptyRequest : AwsRequest<DefaultContent, DefaultParameters, DefaultStageVariables> { };
    public class AwsPostRequest<T> : AwsRequest<T, DefaultParameters, DefaultStageVariables> { };
    public class AwsGetRequest<T> : AwsRequest<DefaultContent, T, DefaultStageVariables> { };

    public class Context
    {
        public string authorizerPrincipalId { get; set; }
        public string cognitoAuthenticationProvider { get; set; }
        public string cognitoAuthenticationType { get; set; }
        public string cognitoIdentityId { get; set; }
        public string userId { get; set; }
        public string sub { get; set; }
        public string email { get; set; }
    };

    public class AwsRequest<content, param, vars>
    {
        /// <summary>
        /// Request content
        /// </summary>
        public content body { get; set; }

        /// <summary>
        /// Request parameters
        /// </summary>
        public param parameters { get; set; }

        /// <summary>
        /// Stage variables updated by gateway
        /// </summary>
        public vars stageVariables { get; set; }

        /// <summary>
        /// Context added by gateway
        /// </summary>
        public Context context { get; set; }
    }
}
