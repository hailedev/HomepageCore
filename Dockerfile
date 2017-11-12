# > docker build -t hailedev/homepagecore .
# > docker run --rm -it -p 8080:80 hailedev/homepagecore
FROM microsoft/aspnetcore:2.0

WORKDIR /var/www
COPY ./Target .

ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]