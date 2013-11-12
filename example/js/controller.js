(function ($app) {

    "use strict";

    $app.IndexController = Ember.Controller.extend({

        /**
         * @property actions
         * @type {Object}
         */
        actions: {

            /**
             * @method cherryPickName
             * @emit cherryPickName
             * @return {void}
             */
            cherryPickName: function() {
                this.socket.emit('cherryPickName');
            }

        },

        /**
         * @property sockets
         * @type {Object}
         */
        sockets: {

            // Update the property from the data received.
//            cherryPickedName: 'name',

            // Update the property using a callback.
            cherryPickedName: function(name) {
                this.set('name', name);
            },

            // When EmberSockets makes a connection to the Socket.IO server.
            connect: function() {
                console.log('EmberSockets has connected...');
            },

            // When EmberSockets disconnects from the Socket.IO server.
            disconnect: function() {
                console.log('EmberSockets has disconnected...');
            }

        },

        /**
         * @property name
         * @type {String}
         */
        name: 'Adam'

    });

})(window.App);