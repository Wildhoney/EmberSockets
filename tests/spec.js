var ember       = require('ember'),
    handlebars  = require('handlebars'),
    should      = require('should');

describe('EmberSockets', function() {

    var $app;

    beforeEach(function() {

        Ember.testing = true;

        $app = Ember.Application.create({

            Socket: ES.Module.extend({
                host: 'localhost',
                port: 8888,
                controllers: ['cats', 'index']
            })

        });

    });

    it('Should be able to bootstrap module', function() {



    });

});