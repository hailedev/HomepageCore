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

# Install npm
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash
RUN apt-get install -yq nodejs build-essential

# Install webpack
RUN npm install webpack@3.11.0 -g
RUN npm install webpack-cli -g

# Restore npm packages
COPY ./HomepageCore.UI/package*.json ./HomepageCore.UI/
RUN npm --prefix ./HomepageCore.UI install

# Copy everything else and build
COPY . ./

# Install node packages and build the app
RUN ./go.sh build ${configuration}
RUN dotnet publish ./HomepageCore.Identity/HomepageCore.Identity.csproj -c ${configuration} -o /target

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /var/www
COPY --from=build-env /target .

# Copy the bootstrapper
COPY ./HomepageCore.Identity/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "docker-entrypoint.sh", "HomepageCore.Identity.dll" ]
