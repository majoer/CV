#!/bin/bash
# This script pulls mats_jorgensen-cv from master @ github.com
# and executes server.js using Node

echo 'Begin pull_from_master_and_start_server.sh'

if [ ! "ls -A src" ]; then
    echo "Please run script from project root"
    exit
fi

PARENT_PID=$1
COUNTER=1
ENVIRONMENT="undefined"

if [ "$uname" == "Darwin" ]; then
    ENVIRONMENT="OSX"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    ENVIRONMENT="Linux"
elif [ "$(expr substr $(uname -s) 1 6)" == "CYGWIN" ]; then
    ENVIRONMENT="Cygwin"
elif [ ENVIRONMENT == "undefined" ]; then
    echo "Unknown environment, shutting down"
    exit
fi

echo "${ENVIRONMENT} environment detected"

if [ ENVIRONMENT == "Cygwin"]; then
    echo "Converting win pid to cygwin pid"
    PARENT_PID=$(ps aux | awk '{print $1, $4}' | grep $PARENT_PID | awk '{print $1}')
fi

if [ -z "$PARENT_PID" ]; then
    echo "Parent PID not supplied. Processing without attempting to kill parent process"
else
    echo "Waiting for parent process (${PARENT_PID}) to close..."

    while [ ${COUNTER} -lt 11 ]; do
        echo "Attempt ${COUNTER} of 10"

        if [ ps -p ${PARENT_PID} > /dev/null ]; then
            sleep 1
            COUNTER=$((COUNTER+1))
        else
            break;
        fi
    done
    if [ ps -p ${PARENT_PID} > /dev/null ]; then
        echo 'Parent process is still running after 10 seconds, killing it manually...'
        kill ${PARENT_PID}
    fi
fi

echo 'Pulling from master...'
git pull origin master

echo 'Installing application'
npm install

echo 'Building Front-End'
npm run build

echo 'Starting server'
node src/server.js
