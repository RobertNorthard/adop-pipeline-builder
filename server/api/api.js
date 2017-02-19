'use strict';

var api = {};

api.properties = function () {
  return {
    'cartridges_url': process.env.CARTRIDGES_URL || 'https://gist.githubusercontent.com/kramos/ae04ccbb542ca7661b5568ae44c9f76f/raw/cartridges.yml'
  };
};

module.exports = api;
