#!/bin/bash

menu()
{
    echo "dev       Build and run the dev container on port 8080"
    echo "prod      Build and run the prod container on port 80"
    echo "build     Builds the image in debug configuration without running"
    echo "run       Runs the image in interactive mode removing containers on close"
    echo ""
}
dbMenu()
{
    echo "add <NAME>    Add a new migration"
    echo "update        Update the database to the last migration added"
    echo ""     
}

if [ "$1" = "dev" ] 
then
    docker-compose up -d
elif [ "$1" = "prod" ]
then
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
elif [ "$1" = "db" ]
then
    if [ "$2" = "add" -a "$#" = 3 ]
    then
        dotnet ef migrations add $3 -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj
    elif [ "$2" = "update" ]
    then
        dotnet ef database update -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj
    else
        dbMenu
    fi
elif [ "$1" = "build" ]
then
    docker build --build-arg configuration=Debug -t hailedev/homepagecore:dev .
elif [ "$1" = "run" ]
then
    docker run --rm -it -p 8080:80 hailedev/homepagecore:dev
else
    menu
fi