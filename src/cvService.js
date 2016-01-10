function createCVService( app ) {
    app.get( '/cv', function( req, res ) {
        fs.readFile( __dirname + '/database/CV_Norwegian.json', 'utf-8', function( err, data ) {
            console.log( "Read from file!" );
            res.type( 'json' );
            res.send( data );
        });
    });
}

module.exports = createCVService;
