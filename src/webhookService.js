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

function createWebhookService( app, properties ) {
    app.post( '/webhook', upload.array(), function( req, res, next ) {
        const event = req.headers['x-github-event'];
        const signature = req.headers['x-hub-signature'];
        const deliveryId = req.headers['x-github-delivery'];
        const contentType = req.headers['content-type'];
        var content = req.body;

        try {
            validateWebhookRequestFormat( event, contentType );
            computeAndValidateSignature( properties.webhookSecret, content, signature );

            res.statusCode = 200;
            res.end();

            if( regardingMasterBranch( content ) ) {
                webhookActivated = true;
                process.exit();
            }


        } catch( ex ) {
            const error = 'An error occurred while processing webhook request';
            console.log( error + ":\n" + ex);
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

function computeAndValidateSignature( secret, content, signature ) {
    const contentString = JSON.stringify( content );
    const hmac = crypto.createHmac( 'sha1', secret ).update( contentString, 'utf-8' );
    const computedSignature = 'sha1=' + hmac.digest( 'hex' );
    const isValidSignature = computedSignature === signature;

    if( !isValidSignature ) {
        throw "Signature did not match";
    }
}

function pullFromMasterAndStartServer() {
    const pid = process.pid;
    spawn( "bash", ['sh/pull_from_master_and_start_server.sh', pid], {
        detached: true,
        stdio: ['ignore', 'inherit', 'inherit']
     })
}

function regardingMasterBranch( content ) {
    const isMasterBranch = content.ref === 'refs/heads/master';
    return isMasterBranch;
}

module.exports = createWebhookService;
