angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal) {

            $ionicModal.fromTemplateUrl('modal.html', {
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
