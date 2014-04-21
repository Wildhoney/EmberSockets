(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: EmberSockets.extend({
            host: 'localhost',
            port: 8888,
            path: 'sockets',
            controllers: ['index']
        })

    });

})(window);