FROM microsoft/aspnetcore-build:2.0 AS build-env
ARG configuration=Release

WORKDIR /build

# Copy csproj and restore as distinct layers
COPY ./HomepageCore.Common/HomepageCore.Common.csproj ./HomepageCore.Common/
COPY ./HomepageCore.Data/HomepageCore.Data.csproj ./HomepageCore.Data/
COPY ./HomepageCore.UI/HomepageCore.UI.csproj ./HomepageCore.UI/
COPY ./test/HomepageCore.UI.Test/HomepageCore.UI.Test.csproj ./test/HomepageCore.UI.Test/
COPY ./HomepageCore.sln ./
RUN dotnet restore

# Install webpack
RUN npm install webpack -g

# Restore npm packages
COPY ./HomepageCore.UI/package*.json ./HomepageCore.UI/
RUN npm --prefix ./HomepageCore.UI install

# Copy everything else and build
COPY . ./

# Install node packages and build the app
RUN dotnet build -c ${configuration}
RUN dotnet test ./test/HomepageCore.UI.Test/HomepageCore.UI.Test.csproj
RUN dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c ${configuration} -o /target

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /var/www
COPY --from=build-env /target .
ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]