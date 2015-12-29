angular.module('ticket.services', [])

.service('TicketService', function(){

  var self = this;

  self.truckCode;
  self.ticketSubmitted = false;



  var setup = function(){
    self.truckCode = self.truckCode || localStorage.truckCode;
    self.ticketSubmitted = self.ticketSubmitted || localStorage.ticketSubmitted;
  };

  self.setTruckCode = function(truckCodeIn){
    self.truckCode = truckCodeIn;
    localStorage.truckCode = truckCodeIn;
  };

  self.setTicketSubmitted = (function(bool){
    self.ticketSubmitted = bool || !self.ticketSubmitted;
    localStorage.ticketSubmitted = self.ticketSubmitted;
  });

  self.getTruckCode = function(){
    return self.truckCode;
  };

  self.getTicketSubmitted = function(){
    return self.ticketSubmitted;
  };

  setup();
});
