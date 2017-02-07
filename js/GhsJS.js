angular.module('GHS_mod', ['ngRoute'])
    .controller('GHS_ctrl', function($scope, $http) {

        //params
        $scope.user = [];

        //login function
        $scope.login = function (user) {

            var param = {
                user_login: user.name,
                user_password: user.password,
                remember: user.remember
            };

            $http.post('http://ghostszmusic.dev/wp-json/ghs_api/v1/login', param)
                .then(function (data) {

                    if (data.success) {
                        console.log('Success!');
                    } else {
                        console.log(data.error_message);
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
                .then(function (data) {

                    if (data.success) {
                        console.log('Success!');
                    } else {
                        console.log(data.error_message);
                    }

                })
                .catch(function () {

                });
        };

    });