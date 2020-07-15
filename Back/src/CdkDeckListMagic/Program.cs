using Amazon.CDK;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CdkAvatar
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            Amazon.CDK.Environment makeEnv(string account, string region)
            {
                return new Amazon.CDK.Environment
                {
                    Account = account,
                    Region = region
                };
            }

            var envEU = makeEnv(account: "722855790333", region: "eu-west-1");

            var app = new App();
            new CdkDeckListMagicStack(app, "CdkAvatarStack", new StackProps{Env = envEU});
            app.Synth();
        }
    }
}
