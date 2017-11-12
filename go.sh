#!/bin/bash

menu()
{
    echo "publish        Publish the application to ./Target"
    echo "build-image    Build the docker image"
    echo "run            Run the application in a docker container"
    echo "help           Show this menu"
    echo ""
}

if [ "$1" = "publish" ] 
then
    dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c Release -o ../Target
elif [ "$1" = "build-image" ]
then
    docker build -t hailedev/homepagecore .
elif [ "$1" = "run" ]
then
    docker run --rm -it -p 8080:80 hailedev/homepagecore
else
    menu
fi