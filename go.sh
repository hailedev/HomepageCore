#!/bin/bash

menu()
{
    echo "dev       Build and run the dev container on port 8080"
    echo "prod      Build and run the prod container on port 80"
    echo "test      Run the unit tests"
    echo ""
}
buildMenu()
{
    echo "debug     Builds client and services in debug mode"
    echo "release   Builds client and services in production mode"
    echo ""
}
dbMenu()
{
    echo "add <NAME>    Add a new migration"
    echo "update        Update the database to the last migration added"
    echo ""     
}
imageMenu()
{
    echo "build <dev|prod>    Builds the image in debug configuration without running"
    echo "run <dev|prod>      Runs the image in interactive mode removing containers on close"
    echo ""
}

if [ "${1,,}" = "dev" ] 
then
    docker-compose up -d
elif [ "${1,,}" = "prod" ]
then
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
elif [ "${1,,}" = "test" ]
then
    dotnet test ./test/HomepageCore.UI.Test/HomepageCore.UI.Test.csproj
elif [ "${1,,}" = "build" ] # build options
then
    if [ "${2,,}" = "debug" ]
    then
        webpack --config ./HomepageCore.UI/webpack.Development.js
        dotnet build -c Debug
    elif [ "${2,,}" = "release" ]
    then
        webpack --config ./HomepageCore.UI/webpack.Production.js
        dotnet build -c Release
    else
        buildMenu
    fi
elif [ "${1,,}" = "db" ] # db options
then
    if [ "${2,,}" = "add" -a "$#" = 3 ]
    then
        dotnet ef migrations add $3 -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj
    elif [ "${2,,}" = "update" ]
    then
        dotnet ef database update -p HomepageCore.Data/HomepageCore.Data.csproj -s HomepageCore.UI/HomepageCore.UI.csproj
    else
        dbMenu
    fi
elif [ "${1,,}" = "image" ] # image options
then
    if [ "${2,,}" = "build" -a "$#" = 3 ]
    then
        if [ "${3,,}" = "dev" ]
        then
            docker build --build-arg configuration=Debug -t hailedev/homepagecore:dev .
        elif [ "${3,,}" = "prod" ]
        then
            docker build --build-arg configuration=Release -t hailedev/homepagecore:latest .
        else
            imageMenu
        fi
    elif [ "${2,,}" = "run" -a "$#" = 3 ]
    then
        if [ "${3,,}" = "dev" ]
        then
            docker run --rm -it -p 8080:80 hailedev/homepagecore:dev -d
        elif [ "${3,,}" = "prod" ]
        then
            docker run --rm -it -p 8080:80 hailedev/homepagecore:latest -d
        else
            imageMenu
        fi
    else
        imageMenu
    fi
else
    menu
fi