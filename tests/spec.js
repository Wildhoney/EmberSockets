describe('EmberSockets', function() {

    var $app;

    beforeEach(function() {

        Ember.testing = true;

        $app = Ember.Application.create({

            Socket: EmberSockets.extend({
                host: 'localhost',
                port: 8888,
                controllers: ['cats', 'index']
            })

        });

    });

    it('Should be able to bootstrap module', function() {



    });

});