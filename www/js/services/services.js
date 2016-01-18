angular.module('ticket.services', [])

  .service('TicketService', function () {

    var self = this;

    self.truckCode;
    self.ticketSubmitted = false;


    var setup = function () {
      self.truckCode = self.truckCode || localStorage.truckCode;
      self.ticketSubmitted = self.ticketSubmitted || localStorage.ticketSubmitted;
    };

    self.setTruckCode = function (truckCodeIn) {
      self.truckCode = truckCodeIn;
      localStorage.truckCode = truckCodeIn;
    };

    self.setTicketSubmitted = (function (bool) {
      self.ticketSubmitted = bool || !self.ticketSubmitted;
      localStorage.ticketSubmitted = self.ticketSubmitted;
    });

    self.getTruckCode = function () {
      return self.truckCode;
    };

    self.getTicketSubmitted = function () {
      return self.ticketSubmitted;
    };

    setup();
  })
  .service('TabService', function ($ionicActionSheet, $rootScope, $state) {

    var self = this;
    var TRUCKCODE = 'ticket.truckCode';

    self.getCurrentTabs = function (stateIn) {
      var tabsSetup;
      switch (stateIn) {
        case TRUCKCODE:
          tabsSetup = truckCodeTabs();
          break;
        default:
          tabsSetup = {};
          break;
      }
      return tabsSetup;
    };

    function truckCodeTabs() {
      return $ionicActionSheet.show({
        buttons: [
          {text: 'About'},
          {text: 'Change Truck Code'},
          {text: 'Pending Tickets'},
          {text: 'Admin'},
          {text: 'Change Password'},
          {text: 'Log out'}
        ],
        cssClass: 'darkOptions',
        cancelText: 'Never Mind',
        cancel: function () {

        },
        buttonClicked: function (index, buttonIn) {

          switch (index) {
            case 0:
              $rootScope.openModal('aboutModal');
              break;
            case 1:
              $state.go('ticket.truckCode');
              break;
            case 2:
              $rootScope.openModal('aboutModal');
              break;
            case 3:
              $rootScope.openModal('aboutModal');
              break;
            case 4:
              $state.go('ticket.finalize');
              break;
            case 5:
              $rootScope.openModal('aboutModal');
              break;
            default:
              break;
          }
          console.log('You clicked ' + buttonIn.text);
          return true;
        }
      });
    }

  });

