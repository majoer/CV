#!/bin/bash
# This script pulls mats_jorgensen-cv from master @ github.com
# and executes server.js using Node

echo 'Begin pull_from_master_and_start_server.sh'
PARENT_PID=$1
COUNTER=1

if ps aux grep WINPID > /dev/null; then
    PARENT_PID=$(ps aux | awk '{print $1, $4}' | grep $PARENT_PID | awk '{print $1}')
fi

if [ -n "$PARENT_PID" ]; then
    echo "Waiting for parent process (${PARENT_PID}) to close..."

    while [ ${COUNTER} -lt 11 ]; do
        echo "Attempt ${COUNTER} of 10"

        if ps -p ${PARENT_PID} > /dev/null; then
            sleep 1
            COUNTER=$((COUNTER+1))
        else
            break;
        fi
    done
    if ps -p ${PARENT_PID} > /dev/null; then
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
