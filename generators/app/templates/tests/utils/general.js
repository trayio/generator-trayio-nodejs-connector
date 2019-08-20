'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.prettyPrintObject = function(object) {
	return JSON.stringify(object, undefined, 2);
};

module.exports = {
	prettyPrintObject: function(object) {
		return JSON.stringify(object, undefined, 2);
	},

	auth: {
		access_token: '',
	},

	generatePayload: function(params) {
		return Object.assign({}, this.auth, params);
	},
};
