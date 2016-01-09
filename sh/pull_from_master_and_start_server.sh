#!/bin/bash
# This script pulls mats_jorgensen-cv from master @ github.com
# and executes server.js using Node

echo 'Begin pull_from_master_and_start_server.sh'

PARENT_PID=$PPID
counter=1
echo "Waiting for parent process ($PARENT_PID) to close..."

while [ $counter -lt 1 ]; do
    echo "Attempt ${counter} of 10"

    if [ $PARENT_PID ]
        then
            break
        else
            sleep 1
            counter=$((counter+1))
        fi
done
if [ $PARENT_PID ]
    then
        echo 'Parent process is still running after 10 seconds, killing it manually...'
        kill $PARENT_PID
fi

cd ..
echo 'Pulling from master...'
git pull origin master

echo 'Clearing node_modules'
rm -r node_modules

echo 'Installing application'
npm install
#
echo 'Starting server'
node src/server.js
