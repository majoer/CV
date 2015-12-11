import request from 'qwest';
import Immutable from 'immutable';

function get( cursor, url ) {
    request.get( url ).then( function( xhr, response ) {
        cursor.update( () => Immutable.fromJS( response ) );
    } ).catch( function( xhr, response, error ) {
        if ( error === undefined ) {
            error = xhr;
        }
        console.log( "Error: " + error );
        cursor.update( () => Immutable.fromJS( {
            error: error
        } ) )
    } )
};

export default get;
