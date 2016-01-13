const createWebhookService = require( './webhookService.js' );
const createCVService = require( './cvService.js' );
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const https = require( 'https' );
const fs = require( 'fs' );

/*
* Initialization HTTP
*/

var properties = readProperties();
var httpServer;
const app = express();

/*
* Configuration
*/

app.use( express.static( 'src/web/static' ) );

/*
* Services
*/

createCVService( app );

/*
* Start Server
*/

httpServer = startHttpServer( properties.port );

/*
* Support methods
*/

function startHttpServer( port ) {
    return app.listen( port, function( req, res ) {
        var host = httpServer.address().address
        var port = httpServer.address().port;
        console.log( "Started service at http://%s:%s", host, port );
    });
}

function readProperties() {
    var fileContents = fs.readFileSync( __dirname + '/server.conf.json');
    return JSON.parse( fileContents );
}

if( properties.webhookServiceEnabled ) {

    /*
    * Initialization HTTPS
    */

    const secureApp = express();
    var httpsServer;

    /*
    * Configuration
    */

    secureApp.use( bodyParser.json() );

    /*
    * Services
    */
    createWebhookService( secureApp, properties );

    /*
    * Start Server
    */

    createAndStartHttpsServer( properties.tlsPort, properties.keyFile, properties.certFile);

    /*
    * Support methods
    */

    function createAndStartHttpsServer ( sslPort, keyFile, certFile ) {
        httpsServer = https.createServer( {
            key: fs.readFileSync( keyFile ),
            cert: fs.readFileSync( certFile )
        }, secureApp).listen(sslPort, function( req, res ) {
            var host = httpsServer.address().address
            var port = httpsServer.address().port;
            console.log( "Started service at https://%s:%s", host, port );
        });
    }
}
