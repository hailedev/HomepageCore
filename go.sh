#!/bin/bash

if [ "$1" = "publish" ] 
then
    dotnet publish ./HomepageCore.UI/HomepageCore.UI.csproj -c Release -o ../Target
fi