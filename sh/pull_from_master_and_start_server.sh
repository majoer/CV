#!/bin/bash
# This script pulls mats_jorgensen-cv from master @ github.com
# and executes server.js using Node
LOG="/var/log/matsjorgensen.no.log"
echo 'Begin pull_from_master_and_start_server.sh' | tee -a ${LOG}

if [ ! "ls -A src" ]; then
    echo "Please run script from project root" | tee -a ${LOG}
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
    echo "Unknown environment, shutting down" | tee -a ${LOG}
    exit
fi

echo "${ENVIRONMENT} environment detected" | tee -a ${LOG}

if [ ENVIRONMENT == "Cygwin" ]; then
    echo "Converting win pid to cygwin pid" | tee -a ${LOG}
    PARENT_PID=$(ps aux | awk '{print $1, $4}' | grep $PARENT_PID | awk '{print $1}')
fi

if [ -z "$PARENT_PID" ]; then
    echo "Parent PID not supplied. Processing without attempting to kill parent process" | tee -a ${LOG}
else
    echo "Waiting for parent process (${PARENT_PID}) to close..." | tee -a ${LOG}

    while [ ${COUNTER} -lt 11 ]; do
        echo "Attempt ${COUNTER} of 10" | tee -a ${LOG}

        if [ ps -p ${PARENT_PID} > /dev/null ]; then
            sleep 1
            COUNTER=$((COUNTER+1))
        else
            break;
        fi
    done
    if [ ps -p ${PARENT_PID} > /dev/null ]; then
        echo 'Parent process is still running after 10 seconds, killing it manually...' | tee -a ${LOG}
        kill ${PARENT_PID}
    fi
fi

echo 'Pulling from master...' | tee -a ${LOG}
git pull origin master | tee -a ${LOG}

echo 'Installing application' | tee -a ${LOG}
npm install | tee -a ${LOG}

echo 'Building Front-End' | tee -a ${LOG}
npm run build | tee -a ${LOG}

echo 'Starting server' | tee -a ${LOG}
node src/main.js | tee -a ${LOG}
