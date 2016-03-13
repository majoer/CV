const createWebhookService = require( './webhookService.js' );
const createCVService = require( './cvService.js' );
const express = require( 'express' );
const fs = require( 'fs' );
const HttpServer = require ( './server.js' ).HttpServer;
const HttpsServer = require ( './server.js' ).HttpsServer;

const properties = readProperties( 'server.conf.json' );
const tlsProperties = readProperties( 'tls.conf.json' );

/*
* Uses
*/

function specifyHttpStaticContent( app ) {
    app.use( express.static( 'src/web/static' ) );
    return true;
}

function specifyHttpsStaticContent( app ) {
    return false;
}

/*
*   Services
*/

function specifyHttpServices( app ) {
    createCVService( app );
    return true;
}

function specifyHttpsServices( app ) {

    if( properties.webhookServiceEnabled ) {
        createWebhookService( app, tlsProperties );
    }

    return properties.webhookServiceEnabled;
}

/*
* Support Functions
*/

function readProperties( fileName ) {
    try {
        const fileContents = fs.readFileSync( __dirname + '/../cfg/' + fileName);
        return JSON.parse( fileContents );
    } catch( ex ) {
        console.log( 'An error occurred while reading file: ' + fileName );
    }
}

/*
* Start Servers
*/

try {
    new HttpServer( properties, specifyHttpStaticContent, specifyHttpServices );
} catch( ex ) {
    console.log( ex );
}

try {
    new HttpsServer( properties, specifyHttpsStaticContent, specifyHttpsServices, tlsProperties );
} catch( ex ) {
    console.log( ex );
}
