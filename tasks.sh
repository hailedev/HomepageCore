#!/bin/bash

echo "starting webpack build"
hotreload="$(grep -Po '"HotReload"\s*:\s*\K(.*)' ./HomepageCore.UI/appsettings.Development.json)"
if [[ "$hotreload" =~ "true" ]]
then
    (cd ./HomepageCore.UI; npm run build:hotdev)
else
    (cd ./HomepageCore.UI; npm run dev)
fi