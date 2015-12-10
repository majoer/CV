var express = require( 'express' );
var app = express();
var fs = require( 'fs' );

app.use( express.static( 'src/web/static' ) );

app.get( '/cv', function( req, res ) {
    fs.readFile( __dirname + '/database/CV_Norwegian.json', 'utf-8', function( err, data ) {
        console.log( "Read from file!" );
        res.type( 'json' );
        res.send( data );
    } );
} );

var server = app.listen( 8081, function() {
    var host = server.address().address
    var port = server.address().port;
    console.log( "Started REST service at http://%s:%s", host, port );
} );
