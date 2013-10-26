(function($window, $ember) {

    "use strict";

    $window.ES = {};

    /**
     * @module ES
     * @subModule Module
     */
    $window.ES.Module = $ember.ObjectController.extend({

        /**
         * @property host
         * @type {String}
         * @default 'localhost'
         */
        host: 'localhost',

        /**
         * @property port
         * @type {Number}
         * @default 080
         */
        port: 80,

        /**
         * @property controllers
         * @type {Array}
         * List of controllers for which the events can be emitted to.
         * @default []
         */
        controllers: [],

        /**
         * @property socket {Object}
         * @type {Object}
         */
        socket: null,

        /**
         * @constructor
         * Responsible for establishing a connect to the Socket.io server.
         */
        init: function init() {

            // Create the host:port string for connecting, and then attempt to establish
            // a connection.
            var server      = 'http://%@:%@'.fmt($ember.get(this, 'host'), $ember.get(this, 'port')),
                socket      = io.connect(server);

            // Store a reference to the socket.
            this.set('socket', socket);

            /**
             * @on connect
             */
            socket.on('connect', this._listen.bind(this));

        },

        /**
         * @method emit
         * @param eventName {String}
         * @param options {Object}
         * Responsible for emitting an event to the waiting Socket.io server.
         * @return {void}
         */
        emit: function emit(eventName, options) {
            $ember.get(this, 'socket').emit(eventName, options);
        },

        /**
         * @method _listen
         * Responsible for listening to events from Socket.io, and updating controller properties that
         * subscribe to those events.
         * @return {void}
         * @private
         */
        _listen: function _listen() {

            var controllers     = $ember.get(this, 'controllers'),
                getController   = this._getController.bind(this),
                events          = [],
                forEach         = $ember.EnumerableUtils,
                module          = this;

            forEach.forEach(controllers, function (controllerName) {

                // Fetch the controller if it's valid.
                var controller  = getController(controllerName),
                    eventNames  = controller.sockets;

                if (controller) {

                    // Iterate over each event defined in the controller's `sockets` hash, so that we can
                    // keep an eye open for them.
                    for (var eventName in eventNames) {

                        if (eventNames.hasOwnProperty(eventName)) {

                            if (events.indexOf(eventName) !== -1) {
                                // Don't observe this event if we're already observing it.
                                continue;
                            }

                            // Push the event so we don't listen for it twice.
                            events.push(eventName);

                            // ...And finally we can register the event to listen for it.
                            $ember.get(module, 'socket').on(eventName, module._update.bind(module));

                        }

                    }

                }

            });

        },

        /**
         * @method _update
         * @param eventData {String|Number|Object}
         * @return {Number} Number of controllers which responded to the event.
         * @private
         */
        _update: function _update(eventData) {

            var controllers             = $ember.get(this, 'controllers'),
                respondingControllers   = 0,
                getController           = this._getController.bind(this);

            // Iterate over each listener controller and emit the event we caught.
            $ember.EnumerableUtils.forEach(controllers, function(controllerName) {

                // Fetch the controller if it's valid.
                var controller = getController(controllerName);

                if (controller) {

                    // Attempt to find a match for the current event name.
                    var correspondingAction = controller.sockets['cherryPickedName'];

                    if (!correspondingAction) {
                        // If we can't find it, then we can't go any further for this controller.
                        return;
                    }

                    if (typeof correspondingAction === 'function') {

                        // We need to invoke the function to respond to the event because the coder
                        // has specified a callback instead of a property to update.
                        correspondingAction.call(controller, eventData);
                        return;

                    }

                    // Otherwise we can go ahead and update the property for this event. Voila!
                    $ember.set(controller, correspondingAction, eventData);
                    respondingControllers++;

                }

            });

            return respondingControllers;

        },

        /**
         * @method _getController
         * @param name {String}
         * Responsible for retrieving a controller if it exists, and if it has defined a `sockets` hash.
         * @return {Object|Boolean}
         * @private
         */
        _getController: function _getController(name) {

            // Format the `name` to match what the lookup container is expecting, and then
            // we'll locate the controller from the `container`.
            name = 'controller:%@'.fmt(name);
            var controller = this.container.lookup(name);

            if (!controller || ('sockets' in controller === false)) {
                // Don't do anything with this controller if it hasn't defined a `sockets` hash.
                return false;
            }

            return controller;

        }

    });

    /**
     * @onLoad Ember.Application
     * @param $app {Object}
     */
    Ember.onLoad('Ember.Application', function($app) {

        $app.initializer({

            /**
             * @property name
             * @type {String}
             * @default 'sockets'
             */
            name: 'sockets',

            /**
             * @method initialize
             * @param container {Object}
             * @param application {Object}
             * @return {void}
             */
            initialize: function(container, application) {

                // Register `socket:main` with Ember.js.
                application.register('socket:main', application.Socket, {
                    singleton: true
                });

                // We then want to inject `socket` into each controller.
                application.inject('controller', 'socket', 'socket:main');

            }

        });
    });

})(window, window.Ember);