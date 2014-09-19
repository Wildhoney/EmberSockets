(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: EmberSockets.extend({
            controllers: ['index'],
            autoConnect: true
        })

    });

})(window);
