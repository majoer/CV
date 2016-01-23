#!bin/bash
# This script helps to setup certificate properties for TLS

echo "BEGIN certificate_setup"

if [ ! "ls -A cfg" ]; then
    echo "Please run script from project root"
    exit
fi

echo "Please enter path to private key"
read PRIVATE_KEY_PATH

echo "Please enter path to certificate"
read CERTIFICATE_PATH

echo "Pleace enter Github Webhook Secret"
read WEBHOOk_SECRET



echo "Removing config file if it exists"
rm ./cfg/tls.conf.json

echo "Creating new configuration file"
touch ./cfg/tls.conf.json

echo "Writing paths to configuration file"
echo '{
    "webhookSecret": "'${WEBHOOk_SECRET}'",
    "keyFile": "'${PRIVATE_KEY_PATH}'",
    "certFile": "'${CERTIFICATE_PATH}'"
}' > ./cfg/tls.conf.json

echo "DONE certificate_setup"
