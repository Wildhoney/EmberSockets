/**
 * ember-sockets adapater script
 * app/adapters/application.js 
 * by Paul Robbins (ShopApps Ltd) created on 2014-09-15 
 * www.shopapps.co.uk
 * paul@shopapps.co.uk
 *
 * NOTES:  This is a ember-cli file used to create a socket adapter
 */
import Ember from 'ember';
import DS from "ember-data";

export default DS.Adapter.extend({
	needs: ['application'],
	init: function() {
		console.log("STARTING SOCKET ADAPTER");
		
		this.socket = this.container.lookup('socket:main').socket;
		this._super();
	},
	
	makeSocketRequest : function (store, eventType, query) {

        var adapter = this;
        /*
        * todo: better manage when a socket is not yet connected
        * need some kind of setTimeout or similar?
        */
        return new Ember.RSVP.Promise(function (resolve, reject) {
            try {
            	if(!adapter.socket.connected)
                {
            		console.log('[Adapter] App.Socket is not yet connected');
            		reject({ message : 'App.Socket is not yet connected'});
                }
            	else
            	{
	                if (adapter.socket.authenticated) {
	                	adapter.socket.emit(eventType, query, function (data) {
	                		console.log('[Adapter] response?', data);
	                        if (data.status) {
	                            resolve(data.content);
	                        } else {
	                            reject(data);
	                        }
	                    });
	                } else {
	                	console.log('[Adapter] App.Socket is not authenticated');
	                    reject({ message : 'App.Socket is not authenticated'});
	                }
            	}
            } catch (e) {
            	console.error('[Adapter] App.Socket is not available for requests', e);
                reject({ message : 'App.Socket is not available for requests'});
            }
        });
        

    },

    find: function (store, type, id) {
    	console.log('[Adapter] FIND: ', type.typeKey);
        return this.makeSocketRequest(store, 'find', {
            type : type.typeKey,
            query : { id : id }
        });
    },
    
    
	findAll: function(store, type, id) {
		console.log('[Adapter] FINDALL: ', type.typeKey, id);
		return this.makeSocketRequest(store, 'findAll', {
            type : type.typeKey,
            query : { since : id }
        });

		
	},
	findQuery: function(store, type, query) {
		return this.makeSocketRequest(store, 'findQuery', {
            type : type.typeKey,
            query : query
        });
	},
	findMany: function(store, type, ids, records) {
		return this.makeSocketRequest(store, 'findMany', {
            type : type.typeKey,
            query : { ids : ids }
        });
	},
	findBelongsTo: function(store, record, url) {
		var id = this.get(record, 'id');
		var type = record.constructor.typeKey;
		console.log('[Adapter] findBelongsTo: ', type, url);
		return this.makeSocketRequest(store, 'findBelongsTo', {
            type : type,
            query : { id : id }
        });
	},
	findHasMany: function(store, record, url) {
		var id = this.get(record, 'id');
		var type = record.constructor.typeKey;
		console.log('[Adapter] findHasMany: ', type, url);
		this.makeSocketRequest(store, 'findHasMany', {
            type : type,
            query : { id : id }
        });
	}
	
	
});
