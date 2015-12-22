angular.module('ticket.services', [])

.service('TicketService', function(){

  this.truckCode = '';

  this.setTruckCode = function(truckCodeIn){
    this.truckCode = truckCodeIn;
  }

});
