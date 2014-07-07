(function($process) {

    "use strict";

    var express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        io          = require('socket.io').listen(server),
        fs          = require('fs'),
        _           = require('underscore');

    // Begin Express so the statistics are available from the `localPort`.
    app.use(express.static(__dirname + '/../example'));
    server.listen($process.env.PORT || 3502);

    /**
     * @on connection
     */
    io.sockets.on('connection', function (socket) {

        /**
         * Updates the content when the `applyFilterByWord` event has been received.
         *
        * @on cherryPickName
        */
        socket.on('cherryPickName', function(name, age) {

            var names = ['Adam', 'Masha', 'Baki', 'Vaidas', 'Dhruv', 'Gabriele', 'Javier',
                         'Noemi', 'Dmitri', 'Simon', 'Artem', 'Raj', 'Mark', 'Mide'];

            socket.emit('cherryPickedName', _.sample(names), Math.floor(Math.random() * 30) + 1);

        });

    });

})(process);