angular.module('starter.controllers', [])
    
    
    .controller('MainCtrl', function ($scope, $ionicPopover) {
       $scope.thisfunction = function () {
           console.log("Clicked");
       }

        $ionicPopover.fromTemplateUrl('templates/mypopover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            console.log( $scope.popover);
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
    })

.controller('DashCtrl', function($scope, $ionicModal) {

            $ionicModal.fromTemplateUrl('templates/modals/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.openModal = function () {
                $scope.modal.show();
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

    })

    .controller('SlideBoxCtrl', function ($scope, $ionicSlideBoxDelegate) {

        $scope.messages = ['There is a fire in <b>sector 3</b>','Fire in <b>sector 3</b> extinguished', 'Reconstruction has begun on <b>sector 3</b>'];

        $scope.nextSlide = function (handleIn) {
            $ionicSlideBoxDelegate.$getByHandle(handleIn).next();
        };

        $scope.previousSlide = function (handleIn) {
            $ionicSlideBoxDelegate.$getByHandle(handleIn).previous();
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

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ActionsCtrl', function($scope, $ionicActionSheet, $ionicBackdrop, $timeout){

      $scope.backdropExample = function () {
        $ionicBackdrop.retain();
        $timeout(function () {
          $ionicBackdrop.release();
        }, 1000)
      };

      $scope.show = function () {

        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: 'Item 1'},
            {text: 'Item 2'}
          ],
          destructiveText: 'Destroy All',
          titleText: 'Options',
          cancelText: 'Never Mind',
          cancel: function(){

          },
          buttonClicked: function(index, buttonIn){
            console.log('You clicked ' + buttonIn.text);
            return true;
          }
        })
      }

    })


;
