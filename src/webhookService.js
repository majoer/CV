const spawn = require( 'child_process' ).spawn;
const process = require( 'process' );
const multer = require( 'multer' );
const crypto = require( 'crypto' );

const upload = multer();
var webhookActivated = false;

process.on( 'exit', function() {
    if( webhookActivated ) {
        pullFromMasterAndStartServer();
    }
});

function createWebhookService( app, properties, server ) {
    app.post( '/webhook', upload.array(), function( req, res, next ) {
        const event = req.headers['x-github-event'];
        const signature = req.headers['x-hub-Signature'];
        const deliveryId = req.headers['x-github-delivery'];
        const contentType = req.headers['content-type'];
        var content = req.body;

        try {
            validateWebhookRequestFormat( event, contentType );
            computeAndValidateSignature( properties.secret, content.toString(), signature );

            res.statusCode = 200;
            res.end();

            if( regardingMasterBranch( content ) ) {
                webhookActivated = true;
                process.exit();
            }


        } catch( ex ) {
            const error = 'An error occurred while processing webhook request:\n' + ex;
            console.log( error );
            res.statusCode = 400;
            res.end( error );
        }
    });
}

function validateWebhookRequestFormat( event, contentType ) {
    const eventIsValid = event === 'push';
    const contentTypeIsValid = contentType.indexOf( 'application/json' ) != -1;
    if( !( eventIsValid && contentTypeIsValid ) ) {
        throw "Illegal request headers";
    }
}

function computeAndValidateSignature( key, content, signature ) {
    const hmac = crypto.createHmac( 'sha1', key ).update( content ).digest( 'hex' );
    const isValidSignature = 'sha1=' + hmac === signature;

    if( !isValidSignature ) {
        throw "Signature did not match";
    }
}

function pullFromMasterAndStartServer() {
    const pid = process.pid;
    spawn( "sh", ['sh/pull_from_master_and_start_server.sh', pid], {
        detached: true,
        stdio: ['ignore', 'inherit', 'inherit']
     })
}

function regardingMasterBranch( content ) {
    const isMasterBranch = content.ref === 'refs/heads/master';
    return isMasterBranch;
}

module.exports = createWebhookService;
