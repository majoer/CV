import qwest from 'qwest';
import Immutable from 'immutable';

function get( cursor, apiCall ) {

    if( '/' !== apiCall.charAt(0)) {
        writeErrorToCursor( cursor, 'An api call must start with /' );
        return;
    }

    qwest.get( apiCall ).then( function( xhr, response ) {

        cursor.update( () => Immutable.fromJS( response ) );
    }).catch( function( xhr, response, error ) {

        handleError( cursor, xhr, response, error )
    })
};

function handleError(cursor, xhr, response, error) {
    if ( error === undefined ) {
        error = xhr;
    }
    console.log( "Error: " + error );
    writeErrorToCursor( cursor, error);
}

function writeErrorToCursor( cursor, error ) {
    cursor.update( () => Immutable.fromJS( {
        error: error
    }));
}

export default get;
