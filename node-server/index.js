var C = require('config'),
    restify = require('restify'),
    restifyMongoose = require('restify-mongoose'),
    mongoose = require('mongoose');


// Initialize server
var server = restify.createServer({
  name: 'restify.mongoose.example.ideas',
  version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Initialize database connection
if( !mongoose.connection.readyState ){

    mongoose.connect( C.Mongo.host, C.Mongo.database, C.Mongo.port, function( err ){
        if( err ){
            console.log('Could not connect to MongoDB', err );
            process.exit(1);
        }
        console.log( 'MongoDB Connected!' );
    });
}

// Model configuration
var IdeaSchema = new mongoose.Schema({
  idea: { type: String, required : true },
  description: { type: String }
})

var Idea = mongoose.model('ideas', IdeaSchema);

var ideas = restifyMongoose(Idea);

// Default routes
server.get( '/echo', function( req, res, next ){
  res.send( 200, req.query );
  next();
});

// Idea CRUD routes
server.get('/ideas', ideas.query());
server.get('ideas/:id', ideas.detail());
server.post('/ideas', ideas.insert());
server.patch('/ideas/:id', ideas.update());
server.del('/ideas/:id', ideas.remove());

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
