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
            }

        },

        /**
         * @property name
         * @type {String}
         */
        name: 'Adam'

    });

})(window.App);