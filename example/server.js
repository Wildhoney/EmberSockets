(function($process) {

    "use strict";

    var express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        io          = require('socket.io').listen(server),
        fs          = require('fs'),
        _           = require('underscore');

    // Begin Express so the statistics are available from the `localPort`.
    app.use(express.static(__dirname + '/'));
    server.listen($process.env.PORT || 3507);

    /**
     * @property name
     * @type {String[]}
     */
    var names = ['Adam', 'Masha', 'Baki', 'Vaidas', 'Dhruv', 'Gabriele', 'Javier',
                 'Noemi', 'Dmitri', 'Simon', 'Artem', 'Raj', 'Mark', 'Mide', 'Richard',
                 'Ahmed', 'John', 'Martha', 'Emmanuel', 'Roy'];

    /**
     * @on connection
     */
    io.sockets.on('connection', function (socket) {

        /**
         * Updates the content when the `applyFilterByWord` event has been received.
         *
        * @on cherryPickName
        */
        socket.on('cherryPickName', function() {
            socket.emit('cherryPickedName', _.sample(names), Math.floor(Math.random() * 30) + 1);
        });

        socket.on('pick name like this', function(name) {
            socket.emit('pick name like this', _.sample(names), Math.floor(Math.random() * 30) + 1);
        });
    });

})(process);
