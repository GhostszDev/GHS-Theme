angular.module('GHS_mod', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: myLocalized.partials + 'nav.html',
                controller: 'GHS_ctrl'
            });
    })
    .controller('GHS_ctrl', function($scope, $http) {

        //params
        $scope.openMenu = false;
        $scope.user_stats = [];
        $scope.user = [];

        //opening and closing the menu
        $scope.menu = function(){

            if($scope.openMenu){
                $scope.openMenu  = false;
            } else{
                $scope.openMenu = true;
            }

        };

        //login function
        $scope.login = function (user) {

            var param = {
                user_login: user.name,
                user_password: user.password,
                remember: user.remember
            };

            $http.post('http://ghostszmusic.dev/wp-json/ghs_api/v1/login', param)
                .then(function(response) {

                    if (response.data.success) {
                        $scope.user_stats = '';
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });
        };

        //signup function
        $scope.signup = function (user) {

            var param = {
                user_name: user.name,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                mailing: user.mailing
            };

            $http.post('http://ghostszmusic.dev/wp-json/ghs_api/v1/signup', param)
                .then(function(response) {

                    if (response.data.success) {
                        console.log('Success!');
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });
        };

    });