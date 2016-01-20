angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, $ionicActionSheet, TicketService, TabService, $ionicHistory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.extraButtons = true;

    $scope.cancelAcceptance = function(){
      TicketService.setTicketSubmitted(false);
      $state.go('ticket.ticket');
    };

    function extraButtons(currentState){

      return (currentState == 'ticket.ticket' || currentState == 'ticket.finalize' || currentState == 'ticket.water' || currentState == 'ticket.product');
    }

    $scope.$on('$ionicView.enter', function (e) {

      var currentState = $ionicHistory.currentStateName();
      $scope.extraButtons = !extraButtons(currentState);

      //TODO: clean this up
      if (currentState == 'ticket.ticket')
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[2];
        bar.style.backgroundColor = "#18bc9a";
      }
      else
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[2];
        bar.style.backgroundColor = "";
      }


      if (currentState == 'ticket.product')
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[3];
        bar.style.backgroundColor = "#18bc9a";
      }
      else
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[3];
        bar.style.backgroundColor = "";
      }


      if (currentState == 'ticket.finalize' || currentState == 'ticket.water')
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[4];
        bar.style.backgroundColor = "#18bc9a";
      }
      else
      {
        var foo = document.getElementsByClassName('tab-nav tabs')[0];
        var bar = foo.getElementsByTagName('a')[4];
        bar.style.backgroundColor = "";
      }

    });
    $scope.optionsDisabled = true;
    $scope.disabled = $scope.optionsDisabled ? "disabled" : "";

    $scope.submitTicket = function () {
      var ticketSubmitted = TicketService.getTicketSubmitted();
      if (!ticketSubmitted || ticketSubmitted == "false") {
        TicketService.setTicketSubmitted(true);
        $state.go('ticket.water');
      }
      else {

        $state.go('ticket.finalize');
      }
    };

    $scope.information = function () {

        $state.go('ticket.ticket');

    };

    $scope.product = function(){
      $state.go('ticket.product')

    };

    $ionicModal.fromTemplateUrl('templates/modals/warningsInfo.html', {
      id: 'about',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $rootScope.aboutModal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modals/exitAcceptance.html', {
      id: 'about',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $rootScope.exitAcceptanceModal = modal;
    });

    {
      $rootScope.openModal = function (modalName) {

        switch (modalName) {
          case 'aboutModal':
            $rootScope.aboutModal.show();
            break;
          case 'exitAcceptance':
            $rootScope.exitAcceptanceModal.show();
            break;
          default:
            break;
        }
      };

      $scope.closeModal = function () {
        $rootScope.aboutModal.hide();
        $rootScope.exitAcceptanceModal.hide();

      };

      $scope.$on('$destroy', function () {
        $rootScope.aboutModal.remove();
        $rootScope.exitAcceptanceModal.remove();

      });

      // Execute action on hide modal
      $scope.$on('mixInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('mixInfoModal.removed', function () {
        // Execute action
      });
    }

    $scope.show = function () {
      console.log($ionicHistory.currentStateName());

      var hideSheet = TabService.getCurrentTabs($ionicHistory.currentStateName());
    }


  })

  .controller('truckCodeCtrl', function ($scope, TicketService, $state) {

    $scope.setTruckCode = function (truckCode) {

      console.log('TruckCode Set to ' + truckCode);
      TicketService.setTruckCode(truckCode);
      console.log('TruckCode saved to TicketService as ' + TicketService.truckCode);
      $state.go('ticket.waitView')
    };
  })

  .controller('waitCtrl', function ($scope, TicketService, $state, $timeout, $ionicHistory) {
    $scope.truckCode = TicketService.getTruckCode();

    $scope.$on('$ionicView.enter', function (e) {
      $timeout(function () {
        $state.go('ticket.hauler');
      }, 5000)
    });
  })

  .controller('finalizeCtrl', function ($scope, TicketService, $state, $timeout, $ionicModal) {

    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);

    canvas.width = canvas.offsetWidth;

    $scope.clearCanvas = function () {
      signaturePad.clear();
    };

    $scope.saveCanvas = function () {
      var sigImg = signaturePad.toDataURL();
      $scope.signature = sigImg;
    };


    $ionicModal.fromTemplateUrl('templates/modals/propertyInfo.html', {
      id: 'propertyInfo',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.propertyInfoModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modals/termsInfo.html', {
      id: 'termsInfo',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.termsInfoModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modals/warningsInfo.html', {
      id: 'warningsInfo',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.warningsInfoModal = modal;
    });

    {
      $scope.openModal = function (modalName) {

        switch (modalName) {
          case 'propertyInfo':
            $scope.propertyInfoModal.show();
            break;
          case 'termsInfo':
            $scope.termsInfoModal.show();
            break;
          case 'warningsInfo':
            $scope.warningsInfoModal.show();
            break;
          default:

            break;
        }
      };

      $scope.closeModal = function () {
        $scope.propertyInfoModal.hide();
        $scope.termsInfoModal.hide();
        $scope.warningsInfoModal.hide();
      };

      $scope.$on('$destroy', function () {
        $scope.propertyInfoModal.remove();
        $scope.termsInfoModal.remove();
        $scope.warningsInfoModal.remove();

      });

      // Execute action on hide modal
      $scope.$on('mixInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('mixInfoModal.removed', function () {
        // Execute action
      });

      // Execute action on hide modal
      $scope.$on('deliveryInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('deliveryInfoModal.removed', function () {
        // Execute action
      });
    }

    $scope.finalizeTicket = function () {
      TicketService.setTicketSubmitted(false);
      $state.go('ticket.waitView');
    };

  })

  .controller('waterCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.waterAdded = 0;
    $scope.increaseWater = function () {
      $scope.waterAdded++;
    };
    $scope.decreaseWater = function () {
      if ($scope.waterAdded != 0) {
        $scope.waterAdded--;
      }
    };
    $scope.submitWater = function () {
      $state.go('ticket.ticket')
    };
  })

  .controller('productCtrl', function ($scope, TicketService, $state, $timeout) {
    $scope.waterAdded = 0;
    $scope.increaseWater = function () {
      $scope.waterAdded++;
    };
    $scope.decreaseWater = function () {
      if ($scope.waterAdded != 0) {
        $scope.waterAdded--;
      }
    };
    $scope.submitWater = function () {
      $state.go('ticket.ticket')
    };
  })

  .controller('haulerCtrl', function ($scope, TicketService, $state, $timeout, $ionicModal, $ionicHistory) {

    $timeout(function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();

    }, 300);

    {
      $ionicModal.fromTemplateUrl('templates/modals/hauler/deliveryInfo.html', {
        id: 'deliveryInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.deliveryInfoModal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modals/hauler/sourceInfo.html', {
        id: 'sourceInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.sourceInfoModal = modal;
      });

      $scope.openModal = function (modalName) {

        switch (modalName) {
          case 'sourceInfo':
            $scope.sourceInfoModal.show();
            break;
          case 'deliveryInfo':
            $scope.deliveryInfoModal.show();
            break;
          default:
            break;
        }
      };

      $scope.closeModal = function () {
        $scope.sourceInfoModal.hide();
        $scope.deliveryInfoModal.hide();
      };

      $scope.$on('$destroy', function () {
        $scope.sourceInfoModal.remove();
        $scope.deliveryInfoModal.remove();
      });

      // Execute action on hide modal
      $scope.$on('mixInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('mixInfoModal.removed', function () {
        // Execute action
      });

      // Execute action on hide modal
      $scope.$on('deliveryInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('deliveryInfoModal.removed', function () {
        // Execute action
      });
    }

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

  .controller('ModalCtrl', function ($scope) {
    $scope.listData = [
      {time: '9:00 AM', event: 'Brunch with President'},
      {time: '10:00AM', event: 'Suplex a Bear'},
      {time: '12:00 Noon', event: 'Repair Warp Core'},
      {time: '2:00 PM', event: 'Late Lunch(Foie Gras Stuffed Faberge Eggs)'}
    ];

    $scope.reorderItem = function (item, fromIndex, toIndex) {
      $scope.listData.splice(fromIndex, 1);
      $scope.listData.splice(toIndex, 0, item);
    };

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
  })

  .controller('TicketCtrl', function ($scope, TicketService, $state, $stateParams, $ionicModal) {


    $scope.timePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 12,  //Optional
      titleLabel: '12-hour Format',  //Optional
      setLabel: 'Set',  //Optional
      closeLabel: 'Close',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };

    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }

    {
      $scope.openTimeModal = function (selectedTime) {
        $scope.selectedTime = selectedTime;
        console.log($scope.selectedTime);
        $scope.openModal('overrideTime');
      };

      $ionicModal.fromTemplateUrl('templates/modals/mixInfo.html', {
        id: 'mixInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.mixInfoModal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modals/ticketDeliveryInfo.html', {
        id: 'deliveryInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.deliveryInfoModal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modals/truckInfo.html', {
        id: 'truckInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.truckInfoModal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modals/codInfo.html', {
        id: 'codInfo',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.codInfoModal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modals/overrideTime.html', {
        id: 'overrideTime',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.overrideTimeModal = modal;
      });

      $scope.openModal = function (modalName) {

        switch (modalName) {
          case 'mixInfo':
            $scope.mixInfoModal.show();
            break;
          case 'deliveryInfo':
            $scope.deliveryInfoModal.show();
            break;
          case 'truckInfo':
            $scope.truckInfoModal.show();
            break;
          case 'codInfo':
            $scope.codInfoModal.show();
            break;
          case 'overrideTime':
            $scope.overrideTimeModal.show();
          default:
            break;
        }
      };

      $scope.closeModal = function () {
        $scope.mixInfoModal.hide();
        $scope.deliveryInfoModal.hide();
        $scope.truckInfoModal.hide();
        $scope.codInfoModal.hide();
        $scope.overrideTimeModal.hide();
      };

      $scope.$on('$destroy', function () {
        $scope.mixInfoModal.remove();
        $scope.deliveryInfoModal.remove();
        $scope.truckInfoModal.remove();
        $scope.codInfoModal.remove();
        $scope.overrideTimeModal.remove();
      });

      // Execute action on hide modal
      $scope.$on('mixInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('mixInfoModal.removed', function () {
        // Execute action
      });

      // Execute action on hide modal
      $scope.$on('deliveryInfoModal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('deliveryInfoModal.removed', function () {
        // Execute action
      });
    }

    $scope.submitTicket = function () {
      var ticketSubmitted = TicketService.getTicketSubmitted();
      if (!ticketSubmitted || ticketSubmitted == "false") {
        TicketService.setTicketSubmitted(true);
        $state.go('ticket.water');
      }
      else {

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
      "constituents": [{
        "itemCode": "2",
        "itemDesc": "Cement (USA)",
        "itemShortDesc": "",
        "actualQty": 5175,
        "actualUOM": "LBR",
        "targetQty": 5170,
        "targetUOM": "LBR",
        "moisture": "   .500"
      },
        {
          "itemCode": "10",
          "itemDesc": "Sand (US Sand))",
          "itemShortDesc": "",
          "actualQty": 15220,
          "actualUOM": "LBR",
          "targetQty": 15204.7000000000007276,
          "targetUOM": "LBR",
          "moisture": "  1.500"
        },
        {
          "itemCode": "26",
          "itemDesc": "3/8\" Stone",
          "itemShortDesc": "",
          "actualQty": 7560,
          "actualUOM": "LBR",
          "targetQty": 7537.5000000000000000,
          "targetUOM": "LBR",
          "moisture": "   .500"
        },
        {
          "itemCode": "27",
          "itemDesc": "3/4\" Stone",
          "itemShortDesc": "",
          "actualQty": 10300,
          "actualUOM": "LBR",
          "targetQty": 10251,
          "targetUOM": "LBR",
          "moisture": "   .500"
        },
        {
          "itemCode": "28",
          "itemDesc": "1 1/4\" Aggregate 1",
          "itemShortDesc": "",
          "actualQty": 14920,
          "actualUOM": "LBR",
          "targetQty": 14874,
          "targetUOM": "LBR",
          "moisture": "   .500"
        },
        {
          "itemCode": "40",
          "itemDesc": "Water (US)",
          "itemShortDesc": "",
          "actualQty": 345,
          "actualUOM": "GLL",
          "targetQty": 345,
          "targetUOM": "GLL",
          "moisture": "   .000"
        },
        {
          "itemCode": "50",
          "itemDesc": "Air Entraining Agent (US) (dos)",
          "itemShortDesc": "",
          "actualQty": 30,
          "actualUOM": "OZA",
          "targetQty": 30,
          "targetUOM": "OZA",
          "moisture": "   .000"
        },
        {
          "itemCode": "57",
          "itemDesc": "Retarder 1",
          "itemShortDesc": "",
          "actualQty": 160,
          "actualUOM": "OZA",
          "targetQty": 155.0999999999999943,
          "targetUOM": "OZA",
          "moisture": "   .000"
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
