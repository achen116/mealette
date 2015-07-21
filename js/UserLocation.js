var EventEmitter = require('event-emitter');

UserLocation = EventEmitter({
  position: null,

  set: function(position){
    UserLocation.position = position;
    UserLocation.emit('change', position);
    return this;
  },

  request: function(){
    if (UserLocation.position) return Promise.resolve(UserLocation.position);
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        function(position){
          UserLocation.set(position);
          resolve(position);
        },
        function(positionError){
          UserLocation.set(null);
          reject(positionError);
        }
      );
    });
    return this;
  },

  remove: function(){
    return UserLocation.set(null);
  }
});


module.exports = UserLocation

window.DEBUG_UserLocation = UserLocation;
