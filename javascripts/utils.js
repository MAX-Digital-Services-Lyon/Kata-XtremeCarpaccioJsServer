'use strict'

//var http = require('http')
var axios = require('axios');

var Utils = function (_axios) {
  this.axios = _axios || axios
}

Utils.prototype = {
  stringify: function (object) {
    return JSON.stringify(object)
  },

  jsonify: function (string) {
    try {
      return JSON.parse(string)
    } catch (exception) {
      throw new Error('The object "' + string + '" is not a valid json object')
    }
  },

  fixPrecision: function (number, precision) {
    return parseFloat(number.toFixed(precision))
  },

  post: function (hostname, port, path, body, onSuccess, onError) {
    var bodyStringified = this.stringify(body)
    let url = `https://${hostname}${path}`;
    console.log(url);
    axios.post(url, body)
      .then(res => {
        return onSuccess(res.data);
      }).catch(error =>{
          if (typeof onError !== 'undefined') {
              return onError(error);
          }
      });
  }
}

module.exports = new Utils()
