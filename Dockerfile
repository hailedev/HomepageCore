FROM microsoft/aspnetcore-build:2.0 AS build-env
ARG configuration=Release

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./HomepageCore.Common/HomepageCore.Common.csproj ./HomepageCore.Common/
COPY ./HomepageCore.Data/HomepageCore.Data.csproj ./HomepageCore.Data/
COPY ./HomepageCore.UI/HomepageCore.UI.csproj ./HomepageCore.UI/
COPY ./HomepageCore.sln ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

# Install node packages and build the app
RUN npm install webpack -g
RUN npm --prefix ./HomepageCore.UI install
RUN dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c ${configuration} -o ../out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /var/www
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]