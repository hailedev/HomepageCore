# HomepageCore
Dotnet Core 2.0 migration of my blog using SQLite and Linux container

Initialize DB

`dotnet ef migrations add InitialMigration -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj`

`dotnet ef database update -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj`

Build the docker container

`docker build -t hailedev/homepagecore:latest .`

`docker run --rm -it -p 8080:80 hailedev/homepagecore`
