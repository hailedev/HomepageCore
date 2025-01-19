#!/bin/bash

menu()
{
    echo "start                     Build and run the containers"
    echo "build                     The build sub menu"
    echo "test                      Run the unit tests"
    echo "db                        DB initialize commands"
    echo "image                     Options for building and running images"
    echo "deploy                    Deploy to production server"
    echo "deploy createdocument     Create the SSM document to deploy the stack"
    echo "deploy deletedocument     Remove the SSM document"
    echo "stack                     Deploy or remove the stack to the current node"
    echo "clean                     Stop and remove all containers"
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

if [ "${1,,}" = "start" ]
then
    if [ "${2,,}" = "dev" ]
    then
        docker compose up -d
    elif [ "${2,,}" = "prod" ]
    then
        docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    else
        echo "start <dev|prod>      Start the <dev|prod> containers on port <8080|80>"
    fi
elif [ "${1,,}" = "stop" ]
then
    if [ "${2,,}" = "dev" ]
    then
        docker compose down
        if [ "${3,,}" = "-d" ]
        then
            docker image rm hailedev/homepagecore
            docker image rm hailedev/homepagecore.identity
        fi
    elif [ "${2,,}" = "prod" ]
    then
        docker compose -f docker-compose.yml -f docker-compose.prod.yml down
        if [ "${3,,}" = "-d" ]
        then
            docker image rm hailedev/homepagecore
            docker image rm hailedev/homepagecore.identity
        fi
    else
        echo "stop <dev|prod>       Stop the <dev|prod> containers"
    fi
elif [ "${1,,}" = "test" ]
then
    dotnet test ./test/HomepageCore.UI.Test/HomepageCore.UI.Test.csproj
    npm test --prefix ./test/HomepageCore.UI.Test/
elif [ "${1,,}" = "build" ] # build options
then
    if [ "${2,,}" = "debug" ]
    then
        (cd ./HomepageCore.UI; webpack --config ./webpack.Development.js)
        dotnet build -c Debug
    elif [ "${2,,}" = "release" ]
    then
        (cd ./HomepageCore.UI; webpack --config ./webpack.Production.js)
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
            docker build --build-arg configuration=Debug -t hailedev/homepagecore:dev -f ./HomepageCore.UI/Dockerfile .
            docker build --build-arg configuration=Debug -t hailedev/homepagecore.identity:dev -f ./HomepageCore.Identity/Dockerfile .
        elif [ "${3,,}" = "prod" ]
        then
            docker build --build-arg configuration=Release -t hailedev/homepagecore:latest -f ./HomepageCore.UI/Dockerfile .
            docker build --build-arg configuration=Release -t hailedev/homepagecore.identity:latest -f ./HomepageCore.Identity/Dockerfile .
        else
            imageMenu
        fi
    elif [ "${2,,}" = "run" -a "$#" = 3 ]
    then
        if [ "${3,,}" = "dev" ]
        then
            docker run --rm -d -p 5001:8080 -e ASPNETCORE_ENVIRONMENT=Development -e ASPNETCORE_URLS=http://*:8080 hailedev/homepagecore:dev
        elif [ "${3,,}" = "prod" ]
        then
            docker run --rm -d -p 5001:8080 -e ASPNETCORE_ENVIRONMENT=Production -e ASPNETCORE_URLS=http://*:8080 hailedev/homepagecore:latest
        else
            imageMenu
        fi
    else
        imageMenu
    fi
elif [ "${1,,}" = "deploy" ]
then
    if [ "${2,,}" = "createdocument" ]
    then
        aws ssm create-document --name "DeployStack" --document-type "Command" --content file://deploy/DeployStack.json
    elif [ "${2,,}" = "deletedocument" ]
    then
        aws ssm delete-document --name "DeployStack"
    else
        aws ssm send-command --instance-ids "${INSTANCE}" --document-name "DeployStack" --comment "Deploying build ${VERSION}" --parameters stackfile="https://raw.githubusercontent.com/hailedev/homepagecore/master/deploy/homepagecore.yml",configfile="https://raw.githubusercontent.com/hailedev/homepagecore/master/deploy/default.conf",nginxfile="https://raw.githubusercontent.com/hailedev/homepagecore/master/deploy/nginx.conf"
    fi
elif [ "${1,,}" = "stack" ]
then
    if [ "${2,,}" = "up" ]
    then
        docker stack deploy -c ./services.yml homepagecore --detach=false
    elif [ "${2,,}" = "down" ]
    then
        docker stack rm homepagecore
    else
        echo "stack <up|down>       Deploy or remove the stack"
    fi
elif [ "${1,,}" = "clean" ]
then
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
else
    menu
fi