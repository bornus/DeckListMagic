namespace DeckList.Commons
{
    public class DefaultContent { };
    public class DefaultParameters { };
    public class DefaultStageVariables { };

    public class AwsEmptyRequest : AwsRequest<DefaultContent, DefaultParameters, DefaultStageVariables> { };

    /// <summary>
    /// For mapping template:
    /// 
    /// #set($allParams = $input.params())
    /// {
    /// "body" : $input.json('$'),
    /// "parameters" : {},
    /// "stageVariables" : {
    /// #foreach($key in $stageVariables.keySet())
    /// "$key" : "$util.escapeJavaScript($stageVariables.get($key))"
    /// #if ($foreach.hasNext),#end
    /// #end
    /// },
    /// "context" : {
    ///     "authorizerPrincipalId" : "$context.authorizer.principalId",
    ///     "cognitoAuthenticationProvider" : "$context.identity.cognitoAuthenticationProvider",
    ///     "cognitoAuthenticationType" : "$context.identity.cognitoAuthenticationType",
    ///     "cognitoIdentityId" : "$context.identity.cognitoIdentityId",
    ///     "userId": "$context.authorizer.claims['cognito:username']",
    ///     "sub": "$context.authorizer.claims.sub",
    ///     "email": "$context.authorizer.claims.email"
    ///     }
    /// }
    /// </summary>
    /// <typeparam name="T">Model of the body</typeparam>
    public class AwsPostRequest<T> : AwsRequest<T, DefaultParameters, DefaultStageVariables> { };

    /// <summary>
    /// For mapping template:
    /// 
    /// #set($allParams = $input.params())
    /// {
    /// "body" : {},
    /// "parameters" : {
    /// #foreach($type in $allParams.keySet())
    /// #set($params = $allParams.get($type))
    ///     "$type" : {
    /// #foreach($paramName in $params.keySet())
    ///         "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
    ///         #if ($foreach.hasNext),#end
    /// #end
    /// }
    /// #if ($foreach.hasNext),#end
    /// #end
    /// },
    /// "stageVariables" : {
    /// #foreach($key in $stageVariables.keySet())
    /// "$key" : "$util.escapeJavaScript($stageVariables.get($key))"
    /// #if ($foreach.hasNext),#end
    /// #end
    /// },
    /// "context" : {
    ///     "authorizerPrincipalId" : "$context.authorizer.principalId",
    ///     "cognitoAuthenticationProvider" : "$context.identity.cognitoAuthenticationProvider",
    ///     "cognitoAuthenticationType" : "$context.identity.cognitoAuthenticationType",
    ///     "cognitoIdentityId" : "$context.identity.cognitoIdentityId",
    ///     "userId": "$context.authorizer.claims['cognito:username']",
    ///     "sub": "$context.authorizer.claims.sub",
    ///     "email": "$context.authorizer.claims.email"
    ///     }
    /// }
    /// </summary>
    /// <typeparam name="T">Model for queries  and path parameters</typeparam>
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
