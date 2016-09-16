var Guid = require('guid');
var Request = require('request');
var Querystring = require('querystring');
var crypto = require('crypto');

function AccountKit() {
	var csrf_guid = Guid.raw();
	var api_version = "";
	var app_id = "";
	var app_secret = '';
	var require_app_secret = false;
	var base_url = 'https://graph.accountkit.com/';
	return {
		set: function(v, id, secret) {
			api_version = v;
			app_id = id;
			app_secret = secret;
		},
		requireAppSecret: function(_require_app_secret) {
			require_app_secret = _require_app_secret;
		},
		getRandomState: function() {
			return csrf_guid;
		},
		getApiVersion: function() {
			return api_version;
		},
		getAppId: function() {
			return app_id;
		},
		getAppSecret: function() {
			return app_secret;
		},
		getEndpoint: function() {
			return base_url + api_version + "/me";
		},
		getDelUrl: function(id) {
			return base_url + api_version + '/' + id;
		},
		getTokenUrl: function() {
			return base_url + api_version + "/access_token";
		},
		getUserData: function(response, accountKitState, accountKitCode, callback) {
			var self = this;
			// CSRF check
			if (accountKitState === csrf_guid) {
				var app_access_token = ['AA', app_id, app_secret].join('|');

				var params = {
					grant_type: 'authorization_code',
					code: accountKitCode,
					access_token: app_access_token
				};

				// exchange tokens
				var token_exchange_url = this.getTokenUrl() + '?' + Querystring.stringify(params);
				//console.log (token_exchange_url);
				Request.get({
					url: token_exchange_url,
					json: true
				}, function(err, resp, respBody) {
					if (err)
						console.log(err);
					// get account details at /me endpoint
					var me_endpoint_url = self.getEndpoint() + '?access_token=' + respBody.access_token;

					if (require_app_secret)
						me_endpoint_url += '&appsecret_proof=' + crypto.createHmac('sha256', app_secret).update(respBody.access_token).digest('hex');
					console.log(me_endpoint_url);
					Request.get({
						url: me_endpoint_url,
						json: true
					}, function(err, resp, respBody) {
						callback(respBody);
					});
				});
			} else {
				callback(undefined);
			}
		},
		deleteUser: function(id, callback) {
			var self = this;
			var app_access_token = ['AA', app_id, app_secret].join('|');
			var delUrl = this.getDelUrl(id) + "?" + "access_token=" + app_access_token;
			Request.del({
				url: delUrl,
				json: true
			}, function(err, resp, respBody) {
				callback(respBody);
			});
		}
	};
}

module.exports = new AccountKit();