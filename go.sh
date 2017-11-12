#!/bin/bash

menu()
{
    echo "publish        Publish the application to ./Target"
    echo "build-image    Publish the application and add it a the docker image"
    echo "build-run      Publish the application to a docker image and run it"
    echo "run            Run the application in a docker container"
    echo "help           Show this menu"
    echo ""
}

buildImage()
{
    dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c Release -o ../Target
    docker build -t hailedev/homepagecore:latest .
}

if [ "$1" = "publish" ] 
then
    dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c Release -o ../Target
elif [ "$1" = "build-image" ]
then
    buildImage
elif [ "$1" = "build-run" ]
then
    buildImage
    docker run --rm -it -p 8080:80 hailedev/homepagecore
elif [ "$1" = "run" ]
then
    docker run --rm -it -p 8080:80 hailedev/homepagecore
else
    menu
fi