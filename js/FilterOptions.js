var EventEmitter = require('event-emitter');

FilterOptions = EventEmitter({
  position: null,
  category: null,
  repopulate: null,

  set: function(position, category, repopulate){
    FilterOptions.position = position;
    FilterOptions.category = category;
    FilterOptions.repopulate = repopulate || 0;
    FilterOptions.emit('change', position, category, repopulate);
    return this;
  },

  requestLocation: function(){
    if (FilterOptions.position) return Promise.resolve(FilterOptions.position);
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        function(position){
          FilterOptions.set(position);
          resolve(position);
        },
        function(positionError){
          FilterOptions.set(null);
          reject(positionError);
        }
      );
    });
    return this;
  },

  remove: function(){
    return FilterOptions.set(null);
  }
});


module.exports = FilterOptions
