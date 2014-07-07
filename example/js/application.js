(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: EmberSockets.extend({
            host: 'localhost',
            port: 3502,
            controllers: ['index']
        })

    });

})(window);