// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace HomepageCore.Identity
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new ApiResource[]
            {
                new ApiResource("api1", "My API #1")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                // MVC client using hybrid flow
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",

                    AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,
                    ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                    RedirectUris = { "http://haile.info/signin-oidc" },
                    FrontChannelLogoutUri = "http://haile.info/signout-oidc",
                    PostLogoutRedirectUris = { "http://haile.info" },

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "api1" },

                    RequireConsent = false
                },

                // SPA client using implicit flow
                new Client
                {
                    ClientId = "spa",
                    ClientName = "React client",
                    ClientUri = "http://haile.info",

                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris =
                    {
                        "http://haile.info",
                        "http://haile.info/signin-callback",
                        "http://haile.info/admin",
                        "http://haile.info/callback.html",
                        "http://haile.info/silent.html",
                        "http://haile.info/popup.html",
                    },
                    FrontChannelLogoutUri = "http://haile.info/signout-callback",
                    PostLogoutRedirectUris = { "http://haile.info" },

                    AllowedCorsOrigins = { "http://haile.info", "https://haile.info" },
                    AllowedScopes = { "openid", "profile", "api1" },

                    RequireConsent = false
                }
            };
        }
    }
}