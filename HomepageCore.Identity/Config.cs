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
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                // backward compat
                new ApiScope("api1"),
                
                // more formal
                new ApiScope("api.scope1"),
                new ApiScope("api.scope2"),
                
                // scope without a resource
                new ApiScope("scope2"),
                
                // policyserver
                new ApiScope("policyserver.runtime"),
                new ApiScope("policyserver.management")
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new ApiResource[]
            {
                new ApiResource("api1", "My API #1")
                {
                    Scopes = { "api1" }
                }
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

                    RedirectUris = { "http://localhost:5001/signin-oidc" },
                    FrontChannelLogoutUri = "http://localhost:5001/signout-oidc",
                    PostLogoutRedirectUris = { "http://localhost:5001" },

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "api1" },

                    RequireConsent = false
                },

                // SPA client using implicit flow
                new Client
                {
                    ClientId = "spa",
                    ClientName = "React client",
                    ClientUri = "http://localhost:5001",

                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris =
                    {
                        "http://localhost:5001",
                        "http://localhost:5001/signin-callback",
                        "http://localhost:5001/admin",
                        "http://localhost:5001/callback.html",
                        "http://localhost:5001/silent.html",
                        "http://localhost:5001/popup.html",
                    },
                    FrontChannelLogoutUri = "http://localhost:5001/signout-callback",
                    PostLogoutRedirectUris = { "http://localhost:5001" },

                    AllowedCorsOrigins = { "http://localhost:5001", "https://localhost:5001" },
                    AllowedScopes = { "openid", "profile", "api1" },

                    RequireConsent = false
                }
            };
        }
    }
}