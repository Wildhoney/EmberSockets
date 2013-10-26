var io          = require('socket.io').listen(8888),
    fs          = require('fs'),
    _           = require('underscore');

/**
 * @on connection
 */
io.sockets.on('connection', function (socket) {
    /**
     * @on cherryPickName
     * @param text {String}
     * Updates the content when the `applyFilterByWord` event has been received.
     */
    socket.on('cherryPickName', function(text) {

        var names = ['Adam', 'Masha', 'Baki', 'Vaidus', 'Dhruv', 'Gabriele', 'Javier',
                     'Noemi', 'Dmitri', 'Simon', 'Artem', 'Raj', 'Mark'];

        socket.emit('cherryPickedName', _.sample(names));

    });

});