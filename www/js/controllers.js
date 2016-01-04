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

  .controller('finalizeCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.finalizeTicket = function(){
      TicketService.setTicketSubmitted(false);
      $state.go('ticket.waitView');
    };
  })

  .controller('waterCtrl', function ($scope, TicketService, $state, $timeout) {
      $scope.waterAdded = 0;
      $scope.increaseWater = function(){
        $scope.waterAdded++;
      };
      $scope.decreaseWater = function(){
        if ($scope.waterAdded != 0){
          $scope.waterAdded--;
        }
      };
    $scope.submitWater = function(){
      $state.go('ticket.ticket')
    };
  })

  .controller('haulerCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.ticket = {

      "address1": "8085 Bell Road",
      "address2": "",
      "address3": "SHAWNEE MISSION, KS, 66219",
      "billTo": "A & K PAVING COMPANY",
      "carrierID": "",
      "carrierName": "",
      "cashStatus": "",
      "city": "",
      "city1": "",
      "cityID": "",
      "comment1": "",
      "comment2": "",
      "comment3": "",
      "contact": "",
      "customerID": "0075",
      "customerName": "A & K PAVING COMPANY",
      "dayFri": "Y",
      "dayMon": "Y",
      "daySat": "N",
      "daySun": "N",
      "dayThu": "Y",
      "dayTue": "Y",
      "dayWed": "Y",
      "description1": "MOBILEhauler Sales Order",
      "description2": "",
      "description3": "",
      "destinationID": "",
      "destinationLatitude": 0,
      "destinationLongitude": 0,
      "dispatchDate": "2015-07-31T00:00:00",
      "dispatchLoadID": 0,
      "dispatchNo": 827,
      "driverSelectedNoDestination": false,
      "driverSelectedNoOrder": false,
      "email": "",
      "feeAmount": 0,
      "freightAmount": 0,
      "isSplitLoad": "",
      "lastDateIn": "1900-01-01T00:00:00",
      "lastDateTime": "1900-01-01T00:00:00",
      "lastDateTimeIn": "1900-01-01T00:00:00",
      "lastEventDate": "1900-01-01T00:00:00",
      "lastEventDateTime": "1900-01-01T00:00:00",
      "lastEventID": "",
      "lastEventLogic": "",
      "lastEventTime": "1900-01-01T00:00:00",
      "lastLoadDate": "1900-01-01T00:00:00",
      "lastLoadDateTime": "1900-01-01T00:00:00",
      "lastLoadTime": "1900-01-01T00:00:00",
      "lastTicketNo": 0,
      "locationEmail": "",
      "lastPO": "",
      "lastTicketDate": "1900-01-01T00:00:00",
      "lastTicketDateTime": "1900-01-01T00:00:00",
      "lastTicketTime": "1900-01-01T00:00:00",
      "lastTimeIn": "1900-01-01T00:00:00",
      "locationAddress1": "3312 N Atherton Rd",
      "locationAddress2": "",
      "locationAddress3": "Independence, MO, 64058",
      "locationContact": "",
      "locationID": "10",
      "locationName": "Clausen Quarry",
      "locationPhone": "(816)458-0092",
      "locationType": "External",
      "locationTypeDescription": "Dispatch Location",
      "orderDescription": "MOBILEhauler Sales Order",
      "orderID": "10524",
      "otherAmount": 0,
      "otherFreightAmount": 0,
      "phone": "913-555-5555",
      "price": 0,
      "productDescription": "BM-1 Base Mix",
      "productID": "01",
      "purchaseOrder": "",
      "qty": 0,
      "quantityScheduled": 0,
      "releaseID": "",
      "returnTicket": "",
      "schedDeliverDateTime": "1900-01-01T00:00:00",
      "schedLoadDateTime": "1900-01-01T00:00:00",
      "sourceLatitude": 0,
      "sourceLongitude": 0,
      "splitProductID": "",
      "startTime": "2015-07-31T07:00:00",
      "state": "",
      "state1": "",
      "stopTime": "2015-07-31T17:00:00",
      "taxAmount": 0,
      "ticketID": "",
      "ticketDate": "1900-01-01T00:00:00",
      "ticketDateTime": "1900-01-01T00:00:00",
      "ticketNo": 0,
      "ticketTime": "1900-01-01T00:00:00",
      "totalAmount": 0,
      "uniqueID": 0,
      "unit": "TON",
      "unitID": "T",
      "vehicleDescription": "",
      "vehicleID": "",
      "vehicleType1Description": "",
      "vehicleType2Description": "",
      "vehicleType3Description": "",
      "vehicleType4Description": "",
      "vehicleType5Description": "",
      "voidStatus": "",
      "zip": "",
      "zip1": "",
      "zoneID": "",
      "truckCode": TicketService.getTruckCode()
    };
    $scope.submitAssignment = function () {
      $state.go('ticket.ticket');
    };
  })

  .controller('TicketCtrl', function ($scope, TicketService, $state, $stateParams) {

    $scope.submitTicket = function () {
      if (!TicketService.getTicketSubmitted()) {
        TicketService.setTicketSubmitted(true);
        $state.go('ticket.water');
      }
      else
      {

        $state.go('ticket.finalize');
      }
    };
    $scope.ticket = {
      "truckCode": TicketService.getTruckCode(),
      "ticketEmail": ["test@someemail.com"],
      "company": {
        "name": "Command Aggregates, Inc.",
        "code": "02"
      },
      "printPrice": true,
      "ticketId": "87DB3AE1-139F-4D78-928B-E82CF74F21B1",
      "ticketNumber": "aaaaa",
      "printTicket": "false",
      "printWeights": "true",
      "currencyId": "USD",
      "shipmentDistance": "0",
      "ticketPrintTime": "2015-10-12T11:00:00",
      "location": {
        "plantCode": "  1",
        "plantName": "Birmingham Plant",
        "phone": "",
        "email": "",
        "plantPhone": "205-288-8733"
      },
      "statusCode": "Scheduled",
      "order": {
        "code": "1",
        "date": "2015-10-12T00:00:00+03:00",
        "id": "70f736bd-493e-4732-dad0-0de65254a732",
        "loadNumber": "1"
      },
      "driver": {
        "id": "07A5EF27-D609-48D4-8538-7858E3C0A7AF",
        "code": "0",
        "name": "Derek Jeter"
      },
      "project": {
        "code": "3002",
        "name": "UAB Softball Complex"
      },
      "hauler": {
        "code": "1",
        "name": "Company Truck"
      },
      "soldToCustomer": {
        "id": "",
        "code": "3000",
        "name": "Charles Contractors, Inc",
        "contactName": "Johnny Jones",
        "contactPhone": "205-555-9764",
        "address": {
          "lineOne": "760 Lorna Road",
          "lineTwo": "",
          "city": "Hoover",
          "countrySubdivision": "AL",
          "postalCode": "35243",
          "countryCode": "USA"
        }
      },
      "shipToCustomer": {
        "id": "",
        "code": "3000",
        "name": "Charles Contractors, Inc",
        "plantCode": "",
        "contactName": "Johnny Jones",
        "contactPhone": "205-555-9764",
        "deliveryInstructions": "",
        "specialDeliveryInstructions": "Etiam imperdiet velit augue, ullamcorper varius lectus rutrum eget. Nulla id consectetur nulla, ut placerat est. Sed non nisl fermentum, porta metus in, ultrices odio. Praesent aliquam leo at tincidunt elementum. Duis accumsan est mi, vitae venenatis quam tincidunt ut. Etiam mauris elit, consequat vel lorem tristique, placerat pharetra augue. Etiam suscipit libero magna, vel vulputate elit facilisis non. Cras sed diam nec enim dapibus lobortis non vitae augue. Pellentesque euismod ligula quis lorem posuere convallis. Aliquam erat volutpat. Praesent placerat turpis eu lectus lacinia, vel imperdiet dolor aliquam. Aenean aliquet mauris odio. Aliquam lacus ante, porta eu urna vel, posuere eleifend mauris.",
        "deliveryZone": "",
        "lot": "",
        "mapPage": "",
        "deliveryLongitude": "0",
        "deliveryLatitude": "0",
        "address": {
          "lineOne": "1500 University Blvd.",
          "lineTwo": "AL",
          "lineThree": "",
          "lineFour": "",
          "lineFive": "",
          "city": "Hoover",
          "countrySubdivision": "AL",
          "postalCode": "10467",
          "countryCode": ""
        }
      },
      "ticketLines": [{
        "itemId": "C52A1912-A576-49ED-861C-C8095AE469FD",
        "itemCode": "3501",
        "itemDesc": "Long 3500 Wall Mix",
        "itemShortDesc": "3500 Wall Mix",
        "orderInternalLineNumber": "  1",
        "lineNumber": "1",
        "productGeneralClassification": "Product",
        "productMaterialClassification": "Concrete",
        "orderedQty": 20,
        "orderedUOM": "cy",
        "deliveredQty": 10,
        "deliveredUOM": "cy",
        "shippedQty": 10,
        "shippedUOM": "cy",
        "isoUnitCode": "YDQ",
        "unitCost": 77.4500000000000028,
        "totalCost": 774.5000000000000000,
        "driverAdded": false,
        "classes": {
          "strengthClass": "",
          "aggregateClass": "",
          "fineAggClass": "",
          "cementClass": "",
          "waterClass": "",
          "admixClass": "",
          "mixClass": "",
          "consistenceClass": "",
          "exposureClass": "",
          "exposureClassList": "",
          "chlorideClass": "",
          "specifiedCementType": ""
        },
        "specification": {
          "specifiedStrength": "",
          "specifiedStrengthUOM": "",
          "maxWCRatio": "",
          "maxAggSize": "",
          "maxAggSizeUOM": "",
          "minAirPercent": "",
          "maximumAirPercent": "",
          "effectiveCement": "",
          "effectiveCementUOM": "",
          "minCementContent": "",
          "minCementContentUOM": "",
          "minCementitiousContent": "",
          "minCementitiousContentUOM": "",
          "maxAdditionalFlyashPct": "",
          "fValue": "",
          "pValue": "",
          "specifiedMaxWater": "",
          "specifiedMaxWaterUOM": "",
          "concreteType": "",
          "designMethod1": "",
          "designMethod2": "",
          "lifetimeYears": ""
        }
      }],
      "invoiceNumber": "",
      "poNumber": "",
      "orderQty": 20,
      "orderQtyUOM": "cy",
      "shippedQty": 10,
      "shippedQtyUOM": "cy",
      "deliveredQty": 10,
      "deliveredQtyUOM": "cy",
      "subTotal": 774.5000000000000000,
      "totalPrice": 824.4700000000000273,
      "tax": 49.9699999999999989,
      "taxCode": "1",
      "previousTotal": 0,
      "grandTotal": 824.4700000000000273,
      "targetSlump": null,
      "targetSlumpUOM": "",
      "scheduledTime": "2015-10-12T11:30:13+03:00",
      "paymentType": "Account",
      "legal": {
        "waivers": {
          "damage": {
            "title": "Damage Release",
            "optional": true,
            "include": true,
            "accepted": false,
            "text": "Waiver!"
          },
          "water": {
            "title": "Water Added Release",
            "optional": true,
            "include": true,
            "accepted": false,
            "text": "Release!"
          }
        },
        "warningsAccepted": false,
        "warnings": "Warnings!!",
        "termsAccepted": false,
        "terms": "Terms!"
      }
    };
  });
