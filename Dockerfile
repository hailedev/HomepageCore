FROM microsoft/aspnetcore:2.0

WORKDIR /var/www
COPY ./Target .

ENTRYPOINT [ "dotnet", "HomepageCore.UI.dll" ]