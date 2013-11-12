(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: ES.Module.extend({
            host: 'localhost',
            port: 8888,
            controllers: ['index']
        })

    });

})(window);