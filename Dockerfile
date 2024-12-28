FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
ARG configuration=Release

WORKDIR /build

# Copy csproj and restore as distinct layers
COPY ./HomepageCore.Data/HomepageCore.Data.csproj ./HomepageCore.Data/
COPY ./HomepageCore.UI/HomepageCore.UI.csproj ./HomepageCore.UI/
COPY ./HomepageCore.Identity/HomepageCore.Identity.csproj ./HomepageCore.Identity/
COPY ./test/HomepageCore.UI.Test/HomepageCore.UI.Test.csproj ./test/HomepageCore.UI.Test/
COPY ./HomepageCore.sln ./
RUN dotnet restore

# Install webpack
RUN npm install webpack -g

# Restore npm packages
COPY ./HomepageCore.UI/package*.json ./HomepageCore.UI/
RUN npm --prefix ./HomepageCore.UI install
COPY ./test/HomepageCore.UI.Test/package*.json ./test/HomepageCore.UI.Test/
RUN npm --prefix ./test/HomepageCore.UI.Test install

# Copy everything else and build
COPY . ./

# Install node packages and build the app
RUN ./go.sh build ${configuration}
RUN ./go.sh test
RUN dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c ${configuration} -o /target

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /var/www
COPY --from=build-env /target .
ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]

# Enable health check
HEALTHCHECK --interval=2m --timeout=3s CMD curl -f http://localhost/ || exit 1