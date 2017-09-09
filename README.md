# HomepageCore
Dotnet Core 2.0 migration of my blog using SQLite and Linux container

Initialize DB
`dotnet ef migrations add InitialMigration -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj`
`dotnet ef database update -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj`
