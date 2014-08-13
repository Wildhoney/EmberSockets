(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: EmberSockets.extend({
            host: 'localhost',
            controllers: ['index']
        })

    });

})(window);
