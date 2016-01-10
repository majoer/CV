const createWebhookService = require( './webhookService.js' );
const createCVService = require( './cvService.js' );
const exec = require( 'child_process' ).exec;
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const fs = require( 'fs' );

/*
* Initialization
*/

var server;
var properties = readProperties();
const app = express();

/*
* Configuration
*/

app.use( express.static( 'src/web/static' ) );
app.use( bodyParser.json() );


/*
* Services
*/

createCVService( app );
createWebhookService( app, properties, server );

/*
* Start Server
*/

server = startServer( properties.port );

/*
* Support methods
*/

function startServer( port ) {
    return app.listen( port, function( req, res ) {
        var host = server.address().address
        var port = server.address().port;
        console.log( "Started REST service at http://%s:%s", host, port );
    });
}

function readProperties() {
    var fileContents = fs.readFileSync( __dirname + '/server.conf.json');
    return JSON.parse( fileContents );
}
