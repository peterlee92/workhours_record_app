const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const handler = require('./handlers/handlers');
const port = 7000;

app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended:true
}));
app.use( '/', function( req, res, next){
    var allowedOrgins = ['http://localhost:3000'];
    var origin = req.headers.origin;
    if( allowedOrgins.indexOf(origin) > -1 ){
        res.setHeader( 'Access-control-Allow-Origin', origin );
    }

    res.setHeader( 'Access-Control-Allow-Methods', 'Get, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.setHeader( 'Access-COntrol-Allow-Headers', 'X-Requested=With,content-type' );
    res.setHeader( 'Access-Control-Allow-Credentials', true );
    res.set( 'Cache-Control', 'no-store' );
    next();
} );

app.get( "/api/:get", async( req, res ) => {
    const data = await handler.handleGet( req );
    res.json(data);
});

app.post( "/api/:post", async( req, res ) => {
    const data = await handler.handlePost( req );
    res.json(data);
})

app.listen(port, function( err ){
    if( err ){
        return false;
    }
    console.log('running')
})