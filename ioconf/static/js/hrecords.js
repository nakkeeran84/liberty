angular.module('conference.hrecords', ['conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.hrecords', {
                url: "/healthCards",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/hrecords.html",
                        controller: "HrecordListCtrl"
                    }
                }
            })

            .state('app.hrecord', {
                url: "/healthCards/:recordId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/hrecord.html",
                        controller: "HrecordCtrl"
                    }
                }
            })

    })
    // Services
    .factory('Hrecord', function ($http, $rootScope, SERVER_PATH) {
        return {
            all: function() {
                return $http.get(SERVER_PATH + '/hrecords');
            },
            get: function(recordId) {
                return $http.get(SERVER_PATH + '/hrecords/' + recordId);
            }
        };
    })
    //Controllers
    .controller('HrecordListCtrl', function ($scope, Hrecord, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        $scope.hrecords = [];
        Hrecord.all().success(function(hrecords) {
            $scope.hrecords = hrecords;
        });
        $scope.doRefresh = function() {
            $scope.hrecords = Hrecord.all().success(function(hrecords) {
                $scope.hrecords = hrecords;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })

    .controller('HrecordCtrl', function ($scope, $stateParams, Hrecord, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        Hrecord.get($stateParams.recordId).success(function(hrecord) {
          console.log(hrecord);
            $scope.hrecord = hrecord[0];
        });
    });
