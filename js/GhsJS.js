angular.module('GHS_mod', ['ngRoute', 'ui.bootstrap', 'ngCookies'])
    .controller('GHS_ctrl', function ($http, $scope, $httpParamSerializerJQLike, $location, $rootScope, $sce, $window, $cookies) {

        //params
        $scope.openMenu = false;
        $scope.domain = site;
        $scope.loggedIn = false;
        $scope.main_url = '/wp-content/theme/GHS-Theme/partials/main.html';
        $scope.config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + $cookies.get('token')
            }
        };
        $rootScope.post_id = post_id;
        $scope.user_stats = [];
        $scope.user = [];
        $scope.related = [];
        $scope.listbox = [];
        $scope.post = [];
        $scope.gameList = [];
        $scope.notifications = [];
        $scope.employee = [
            {
                name: 'Steven "Ghost" Rivera',
                position: 'Founder/Owner',
                desc: 'I want to inspire the massive by creating the greatest games I possibly can.',
                img: 'https://pbs.twimg.com/profile_images/834395726469877766/spmuKxO_.jpg',
                fb_link: 'https://www.facebook.com/GhostszLife',
                t_link: 'https://twitter.com/HoodieDork',
                yt_link: 'https://www.youtube.com/user/ghostszmusic?sub_confirmation=1'
            }
        ];
        $scope.def_post = {
            post_num: 6,
            cat: ''
        };
        $scope.offset = 0;
        $scope.related_def = {
            post_num: 3,
            cat: cat
        };
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.comments = [];
        $scope.contact = [];
        $scope.comment = '';
        $scope.friends = [];
        $scope.feed = [];
        $scope.com = "";
        $scope.blobImg = "";
        $scope.userEdit = false;
        $scope.files = "";
        $scope.fbData = {};
        $scope.gData = {};

        //oauth test
        $scope.oauth = function () {

            // $http({
            //     url: $scope.domain + "wp-json/ghs_api/v1/ghs_oauth",
            //     method: "GET",
            //     headers: {
            //         'content-type': 'application/x-www-form-urlencoded',
            //         'Authorization': 'Bearer ' + $cookies.get('token')
            //     },
            //     data: $httpParamSerializerJQLike({})
            // })
            $http.post($scope.domain + "wp-json/ghs_api/v1/ghs_oauth", $httpParamSerializerJQLike({}), $scope.config)
                .then(function (response) {
                    $scope.user.token = response.data.result.access_token;
                    $window.localStorage.setItem('token', response.data.result.access_token);

                })
                .catch(function () {

                })

        };

        //token functions
        $scope.getTokenUser = function () {

            console.log($scope.user.token);

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/getTokenUserData",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    token: $scope.user.token
                })
            })
                .then(function (response) {


                })
                .catch(function () {

                })

        };

        //get safe html back
        $scope.safe = function (x) {
            return $sce.trustAsHtml(x);
        };

        //get userData
        $scope.getUser = function () {

            // $http({
            //     url: $scope.domain + "wp-json/ghs_api/v1/getuserdata",
            //     method: "POST",
            //     headers: {
            //         'content-type': 'application/x-www-form-urlencoded',
            //         'Authorization': 'Bearer ' + $cookies.get('token')
            //     },
            //     data: $httpParamSerializerJQLike({
            //     })
            // })
            $http.post($scope.domain + "wp-json/ghs_api/v1/getuserdata",
                $httpParamSerializerJQLike({}),
                $scope.config)
                .then(function (response) {

                    if (response.data.success) {
                        $scope.user = response.data.user;

                        if(response.data.user.useBlob){
                            $scope.user.user_icon = window.atob(response.data.user.user_icon);
                            $scope.user.user_icon_big = window.atob(response.data.user.user_icon_big);
                            $scope.user.user_icon_100 = window.atob(response.data.user.user_icon_100);
                        }

                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //get some post
        $scope.get_post = function (post, offset) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/ghs_post",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')

                },
                data: $httpParamSerializerJQLike({
                    post_num: post.post_num,
                    cat: post.cat,
                    ex: post_id,
                    offset: offset

                })
            })
                .then(function (response) {

                    if (response.data.success) {

                        angular.forEach(response.data.post, function (value, key) {

                            response.data.post.date = new Date(value.date);

                        });

                        $scope.post = response.data.post;


                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //login function
        $scope.login = function (user) {

            if (angular.isUndefined(user.remember)) {
                user.remember = true;
            }


            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/login",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    user_login: user.name,
                    user_password: user.password,
                    remember: user.remember
                })
            })
                .then(function (response) {

                    if(response.data.success == true) {
                        $(window).attr('location', $scope.domain);
                    }

                })
                .catch(function () {

                });
        };

        //logout function
        $scope.logout = function () {

            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {

                    FB.logout(function (response) {
                        // Person is now logged out
                    });

                }
            });

            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: '979177383237-vevih7vk4k8niblajr70uu1qfbesapt0.apps.googleusercontent.com',
                    fetch_basic_profile: true,
                    scope: 'profile'
                });

                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });

            });

            // $(window).attr('location', $scope.domain);

        };

        //signup function
        $scope.signup = function (user) {

            if (user.birthday == null || !user.birthday) {
                user.birthday = user.year + '-' + user.month + '-' + user.date;
            }

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/signup",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    user_name: user.name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    mailing: user.mailing,
                    gender: user.gender,
                    birthday: user.birthday,
                    FBAccess: user.FBAccess,
                    GAccess: user.GAccess,
                    FBID: user.FBID,
                    GID: user.GID
                })
            })
                .then(function (response) {

                    $(window).attr('location', $scope.domain);
                    // $(window).attr('location', $scope.domain);

                })
                .catch(function () {

                });
        };

        //gets single post
        $scope.getSinglePost = function (postID) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/singlePost",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    postID: postID
                })
            })
                .then(function (response) {

                    if (response.data.success) {

                        $scope.current_post = response.data.post;

                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //get comment list
        $scope.getCommentList = function () {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/getComments",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    postID: $rootScope.post_id
                })
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.comments = response.data.comment;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //post comment
        $scope.postComment = function (user, type, comment, orginialUser) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/post_comment",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    postID: $rootScope.post_id,
                    user_name: user.userName,
                    user_email: user.email,
                    comment: comment,
                    comment_parent: type,
                    user_id: user.ID
                })
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.user_stats = response.data.user_info.data;
                        $scope.loggedIn = true;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                })
                .finally(function () {
                    $scope.getCommentList();
                });

        };

        //carousel items
        $scope.carouselItems = function () {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/carouselItems",
                method: "GET",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.listbox = response.data.post;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //contact us form
        $scope.contactUs = function (contact) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/contactUs",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    name: contact.name,
                    email: contact.email,
                    msg: contact.msg
                })
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.contact = [];
                        $scope.message = response.data.message;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //grabbing the game list
        $scope.grabGamesList = function () {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/grabGameList",
                method: "GET",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                }
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.gameList = response.data.gameList;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //get friends list
        $scope.friendsList = function (userID) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/friendsList",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    userID: userID
                })
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.friends = response.data.friend;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //get users feed
        $scope.userFeed = function () {

            $scope.user = user;
            console.log($scope.user);

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/userFeed",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    userName: $scope.user
                })
            })
                .then(function (response) {

                    if (response.data.success) {

                        $scope.feed = response.data.feed;

                    } else {

                        console.error(response.data.error_message);
                    }

                    if (!response.data.user) {

                        $(window).attr('location', $scope.domain);

                    } else {

                        $scope.userProfile = response.data.user;

                        if(response.data.user.useBlob){
                            $scope.userProfile.user_icon = window.atob(response.data.user.user_icon);
                            $scope.userProfile.user_icon_big = window.atob(response.data.user.user_icon_big);
                            $scope.userProfile.user_icon_100 = window.atob(response.data.user.user_icon_100);
                        }

                        $scope.friendsList($scope.userProfile.ID);

                    }

                })
                .catch(function () {

                });

        };

        //user feed comments
        $scope.userFeedCom = function (com, par) {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/userUpdate",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    userID: $scope.user.ID,
                    comment: com,
                    comment_parent: par
                })
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.com = "";

                    } else {
                        console.error(response.data.error_message);
                    }

                })
                .catch(function () {

                })
                .finally(function () {

                    $scope.userFeed($scope.user.ID);

                });

        };

        //next page for blog pagination
        $scope.nextpage = function () {

            $scope.offset += 6;

            $scope.get_post($scope.def_post, $scope.offset)

        };

        //prev page for blog pagination
        $scope.prevpage = function () {

            if ($scope.offset > 0) {

                $scope.offset -= 6;
                $scope.get_post($scope.def_post, $scope.offset);

            }

        };

        //upload img to database
        $scope.uploadImg = function () {

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/updateImg",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    img: window.btoa($scope.blobImg),
                    user_ID: $scope.user.ID
                })
            })
                .then(function (response) {

                    // console.log(response);

                })
                .catch(function () {

                })
                .finally(function () {
                    $scope.getUser();
                });

        };

        //Facebook login
        $scope.fbLogin = function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {

                    console.log('Logged In');

                }
                else {
                    // $scope.fbData.user_ID = response.authResponse.userID;
                    FB.login(function (response) {

                        // handle the response
                        // console.log(response.authResponse);
                        $scope.fbData.FBID = response.authResponse.userID;
                        $scope.fbData.FBaccess = response.authResponse.accessToken;
                        // console.log($scope.fbData);

                        FB.api(
                            "/" + $scope.fbData.FBID + "?fields=email,birthday,first_name,last_name,gender",
                            function (response) {
                                if (response && !response.error) {

                                    /* handle the result */
                                    $scope.fbData.first_name = response.first_name;
                                    $scope.fbData.last_name = response.last_name;
                                    $scope.fbData.email = response.email;
                                    $scope.fbData.gender = response.gender;
                                    $scope.fbData.birthday = response.birthday.split('/');
                                    $scope.fbData.birthday = $scope.fbData.birthday[2] + "-" + $scope.fbData.birthday[0] + "-" + $scope.fbData.birthday[1];
                                    $scope.fbData.user_name = response.last_name + "_" + response.first_name + "_" + Math.floor((Math.random() * 1000000) + 1);

                                    $http({
                                        url: $scope.domain + "wp-json/ghs_api/v1/social",
                                        method: "POST",
                                        headers: {
                                            'content-type': 'application/x-www-form-urlencoded',
                                            'Authorization': 'Bearer ' + $cookies.get('token')
                                        },
                                        data: $httpParamSerializerJQLike({
                                            user_name: $scope.fbData.user_name,
                                            first_name: $scope.fbData.first_name,
                                            last_name: $scope.fbData.last_name,
                                            email: $scope.fbData.email,
                                            password: $scope.fbData.password,
                                            mailing: true,
                                            gender: $scope.fbData.gender,
                                            birthday: $scope.fbData.birthday,
                                            FBAccess: $scope.fbData.FBAccess,
                                            GAccess: $scope.fbData.GAccess,
                                            FBID: $scope.fbData.FBID,
                                            GID: $scope.fbData.GID
                                        })
                                    })
                                        .then(function (response) {

                                            if (response.data.success) {

                                                $(window).attr('location', $scope.domain);

                                            }

                                        })
                                        .catch(function () {

                                        });

                                } else {

                                    console.error(response);

                                }
                            }
                        );

                        // FB.api(
                        //     "/" + $scope.fbData.userID + "/permissions",
                        //     function (response) {
                        //         if (response && !response.error) {
                        //             /* handle the result */
                        //             console.log(response);
                        //         } else {
                        //             console.log(response);
                        //         }
                        //     }
                        // );

                    }, {scope: 'public_profile, email, user_birthday, user_games_activity, user_friends'});

                }
            });
        };

        //Google login
        $scope.gLogin = function () {

            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: '979177383237-vevih7vk4k8niblajr70uu1qfbesapt0.apps.googleusercontent.com',
                    fetch_basic_profile: true,
                    scope: 'profile'
                });

                // Sign the user in, and then retrieve their ID.
                auth2.signIn().then(function () {
                    $scope.gData.GID = auth2.currentUser.get().getId();
                    $scope.gData.first_name = auth2.currentUser.get().getBasicProfile().getGivenName();
                    $scope.gData.last_name = auth2.currentUser.get().getBasicProfile().getFamilyName();
                    $scope.gData.email = auth2.currentUser.get().getBasicProfile().getEmail();
                    $scope.gData.user_name = $scope.gData.last_name + "_" + $scope.gData.first_name + "_" + Math.floor((Math.random() * 1000000) + 1);

                    // console.log(auth2.currentUser.get().getBasicProfile());

                    // console.log($scope.gData);

                    $http({
                        url: $scope.domain + "wp-json/ghs_api/v1/social",
                        method: "POST",
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + $cookies.get('token')
                        },
                        data: $httpParamSerializerJQLike({
                            user_name: $scope.gData.user_name,
                            first_name: $scope.gData.first_name,
                            last_name: $scope.gData.last_name,
                            email: $scope.gData.email,
                            password: $scope.gData.password,
                            mailing: true,
                            gender: $scope.gData.gender,
                            birthday: $scope.gData.birthday,
                            FBAccess: $scope.gData.FBAccess,
                            GAccess: $scope.gData.GAccess,
                            GID: $scope.gData.GID
                        })
                    })
                        .then(function (response) {

                            if (response.data.success) {

                                $(window).attr('location', $scope.domain);

                            }

                        })
                        .catch(function () {

                        });

                });
            });

        };

        //returns string into json format
        $scope.jsonReturn = function (data) {

            return JSON.stringify(data);

        };

        $scope.uploadFile = function () {
            var preview = document.querySelector('#photo-id');
            var file    = document.querySelector('input[type=file]').files[0];
            var reader  = new FileReader();

            reader.addEventListener("load", function () {
                preview.src = reader.result;
                $scope.blobImg = reader.result;
                // console.log('BlobImg: ' + window.btoa($scope.blobImg));
                $scope.uploadImg();
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        };

        $scope.showBlobImg = function(file){

            var preview = document.querySelector('#photo-id');
            preview.src = file;
            // console.log(file);

        };

        $scope.editUser = function(){

            $scope.userEdit = true;

        };

        $scope.saveUser = function(user){

            $scope.userEdit = false;
            user.birthday = user.year + '-' + user.month + '-' + user.date;

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/updataUser",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $cookies.get('token')
                },
                data: $httpParamSerializerJQLike({
                    userID: user.ID,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    mailing: user.mailing,
                    gender: user.gender,
                    birthday: user.birthday,
                    FBAccess: user.FBAccess,
                    GAccess: user.GAccess,
                    FBID: user.FBID,
                    GID: user.GID
                })
            })
                .then(function (response) {

                    console.log(response.data);

                })
                .catch(function () {

                })
                .finally(function () {
                    $scope.getUser();
                });

        };

        //FaceBook SDK
        window.fbAsyncInit = function () {
            FB.init({
                appId: '220252511670899',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10'
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    });