#!/bin/bash

menu()
{
    echo "dev       Build and run the dev container on port 8080"
    echo "prod      Build and run the prod container on port 80"
    echo ""
}

if [ "$1" = "dev" ] 
then
    docker-compose up -d
elif [ "$1" = "prod" ]
then
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
else
    menu
fi