const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const https = require( 'https' );
const fs = require( 'fs' );

function Server ( properties, specifyStaticContent, specifyServices ) {

    const propertiesIsObjet = typeof properties === 'object';
    const specifyStaticContentIsFunction = typeof specifyStaticContent === 'function';
    const specifyServicesIsFunction = typeof specifyServices === 'function';

    if ( !(propertiesIsObjet && specifyStaticContentIsFunction && specifyServicesIsFunction) ) {
        throw "Illegal Argument Exception";
    }

    this.app = express();
    this.server = undefined;

    this.hasStaticContent = specifyStaticContent( this.app );
    this.hasServices = specifyServices( this.app );

    if( !(this.hasStaticContent || this.hasServices ) ) {
        throw "No Content Or Services Exception";
    }
}

function HttpServer( properties, specifyUses, specifyServices ) {
    Server.call( this, properties, specifyUses, specifyServices );

    const that = this;

    this.server = this.app.listen( properties.port, function( req, res ) {
        var host = that.server.address().address
        var port = that.server.address().port;
        console.log( "Started service at http://%s:%s", host, port );
    });
}

function HttpsServer( properties, specifyUses, specifyServices, tlsProperties ) {
    Server.call( this, properties, specifyUses, specifyServices );

    const that = this;
    const keyFile = fs.readFileSync( tlsProperties.keyFile );
    const certFile = fs.readFileSync( tlsProperties.certFile );
    const options = {
        key: keyFile,
        cert: certFile
    };

    this.app.use( bodyParser.json() );
    this.server = https.createServer( options, this.app )
    .listen( properties.tlsPort, function( req, res ) {
        const host = that.server.address().address
        const port = that.server.address().port;
        console.log( "Started service at https://%s:%s", host, port );
    });
}

module.exports = {
    HttpServer: HttpServer,
    HttpsServer: HttpsServer
}
