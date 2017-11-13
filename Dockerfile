FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
#COPY **/*.csproj ./
#RUN dotnet restore

# Copy everything else and build
COPY . ./

# Install node packages and build the app
RUN npm install webpack -g
RUN npm --prefix ./HomepageCore.UI install
RUN dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c Release -o ../out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /var/www
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]