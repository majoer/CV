import request from 'qwest';
import Immutable from 'immutable';

function get( cursor, url ) {
    request.get( url ).then( function( result ) {
        cursor.update( () => Immutable.fromJS( JSON.parse( result.response ) ) );
    } ).catch( function( error ) {
        console.log( "Error: " + error );
        cursor.update( () => Immutable.fromJS( {
            error: error
        } ) )
    } )
};

export default get;
