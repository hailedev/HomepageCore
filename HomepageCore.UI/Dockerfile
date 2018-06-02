FROM microsoft/dotnet:2.1-sdk AS build-env
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
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -yq nodejs build-essential
RUN npm install npm -g

# Install webpack
RUN npm install webpack@3.11.0 -g
RUN npm install webpack-cli -g

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
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /var/www
COPY --from=build-env /target .

# Trust the signing certificate
COPY ./cert.crt /usr/local/share/ca-certificates
RUN update-ca-certificates

# Copy the bootstrapper
COPY ./HomepageCore.UI/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "docker-entrypoint.sh", "HomepageCore.UI.dll" ]

# Enable health check
#HEALTHCHECK --interval=2m --timeout=3s CMD curl -f http://localhost/ || exit 1