EmberSockets
============

<img src="https://travis-ci.org/Wildhoney/EmberSockets.png?branch=master" />
&nbsp;
<img src="https://badge.fury.io/js/ember-sockets.png" />

Socket.io (WebSockets) integrated with Ember.js' observer pattern.

Example
------------

You need Node.js installed to use the example.

If you have it installed, you can simply run `node example/server.js` and then open `localhost/example/index.html` in your web-browser.

Getting Started
------------

First of all you need to bootstrap the module, which is done very much the same way that `Ember.DS` and `Ember.Router` go about it.

In your `Ember.Application` you need to configure EmberSockets by defining the host (default is `localhost`), the port (default is `80`) and the controllers capable of responding to WebSocket events.

```javascript
window.App = Ember.Application.create({

    Socket: ES.Module.extend({
        host: 'localhost',
        port: 8888,
        controllers: ['cats', 'dogs', 'rabbits]
    })

});
```

In the above configuration, we'll be attempting to connect to `localhost` on port `8888`. Only three controllers will be able to respond to WebSocket events: `CatsController`, `DogsController`, and the `RabbitsController`.

To begin responding to events, you need to create a map of events to their properties. When the event is invoked the property will be updated with the response.

Since the release of Ember 1.0, you have been encouraged to place your actions into the `actions` hash on each controller &ndash; EmberSockets works in a similar way by defining the `sockets` hash.

```javascript
sockets: {
    cherryPickedName: 'name'
}
```

From this we can deduce that whenever the `cherryPickedName` event has been invoked, the `name` property on the controller will be updated with the event's data.

As the properties are all updated with the typical `Ember.get`, all computed properties and observes will work as usual.

```html
<section>Your name is {{name}}!</section>
```

If you would like to `emit` an event, you can use the `this.sockets.emit` method from **any** controller &ndash; passing in the event name followed by an options.