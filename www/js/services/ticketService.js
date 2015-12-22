angular.module('ticket.services', [])

.service('TicketService', function(){

  var self = this;

  self.truckCode;



  var setup = function(){
    self.truckCode = self.truckCode || localStorage.truckCode;
  };

  self.setTruckCode = function(truckCodeIn){
    self.truckCode = truckCodeIn;
    localStorage.truckCode = truckCodeIn;
  };

  self.getTruckCode = function(){
    return self.truckCode;
  };

  setup();
});
