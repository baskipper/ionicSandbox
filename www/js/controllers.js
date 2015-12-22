angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('truckCodeCtrl', function ($scope, TicketService, $state) {

    $scope.setTruckCode = function (truckCode) {

      console.log('TruckCode Set to ' + truckCode);
      TicketService.setTruckCode(truckCode);
      console.log('TruckCode saved to TicketService as ' + TicketService.truckCode);
      $state.go('ticket.waitView')
    };
  })

  .controller('waitCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.truckCode = TicketService.getTruckCode();

    $timeout(function () {
      $state.go('ticket.hauler');
    }, 5000)
  })

  .controller('haulerCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.ticket = {

      startTime: "2015-07-31T07:00:00",
      schedLoadDateTime: "1999-12-30T12:34:00",
      schedDeliverDateTime: "1999-12-30T15:16:00",
      productDescription: "BM-1 Base Mix",
      dispatchNo: 827,
      orderID: "10524",
      truckCode: TicketService.getTruckCode(),
      purchaseOrder: 'po numb3r',
      locationID: "10",
      customerName: "A & K PAVING COMPANY",
      address1: "8085 Bell Rd",
      address3: "SHAW MISSION, KS, 66219",



    };
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
