angular.module('GHS_mod', ['ngRoute', 'ui.bootstrap'])
    .directive('fileInput', function ($parse, $http, $httpParamSerializerJQLike) {
        return{
            link:function ($scope, element, attrs) {
                element.on("change", function (event) {
                    var files = event.target.files;
                    var reader = new FileReader();

                    reader.onloadend = function () {

                        console.log('Result', reader.result);

                        // $http({
                        //     url: $scope.domain + "wp-json/ghs_api/v1/uploadMedia",
                        //     method: "POST",
                        //     headers: {
                        //         'content-type': 'application/x-www-form-urlencoded'
                        //     },
                        //     data: $httpParamSerializerJQLike({
                        //         content: reader.result,
                        //         userID: user_id,
                        //         type: reader.type,
                        //         mediaType: files[0].typeName
                        //     })
                        // })
                        //     .then(function(response) {
                        //
                        //         if (response.data.success) {
                        //
                        //             console.log(response.data);
                        //
                        //         } else {
                        //             console.log(response.data);
                        //         }
                        //
                        //     })
                        //     .catch(function () {
                        //
                        //     });
                    };

                    reader.readAsDataURL(files[0]);

                    $parse(attrs.fileInput).assign(element[0].files);
                    $scope.$apply();
                });
            }
        }
    })
    .controller('GHS_ctrl', function($http, $scope, $httpParamSerializerJQLike, $location, $rootScope, $sce, $window) {

        //params
        $scope.openMenu = false;
        $scope.domain = site;
        $scope.loggedIn = false;
        $scope.main_url = '/wp-content/theme/GHS-Theme/partials/main.html';
        $rootScope.post_id = post_id;
        $scope.user_stats = [];
        $scope.user = [];
        $scope.related = [];
        $scope.listbox = [];
        $scope.post = [];
        $scope.gameList = [];
        $scope.notifications = [];
        $scope.employee = [
            {name: 'Steven "Ghost" Rivera', position: 'Founder/Owner', desc: 'I want to inspire the massive by creating the greatest games I possibly can.', img: 'https://pbs.twimg.com/profile_images/834395726469877766/spmuKxO_.jpg', fb_link: 'https://www.facebook.com/GhostszLife', t_link: 'https://twitter.com/HoodieDork', yt_link: 'https://www.youtube.com/user/ghostszmusic?sub_confirmation=1'}
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
        $scope.files = "";
        $scope.fbData = {};

        //get safe html back
        $scope.safe = function(x) {
            return $sce.trustAsHtml(x);
        };

        //get userData
        $scope.getUser = function(){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/getuserdata",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    user_ID: user_id
                })
            })
                .then(function(response) {

                    if (response.data.success) {
                        $scope.user = response.data.user;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //get some post
        $scope.get_post = function(post, offset){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/ghs_post",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    post_num: post.post_num,
                    cat: post.cat,
                    ex: post_id,
                    offset: offset

                })
            })
                .then(function(response) {

                    if (response.data.success) {

                        angular.forEach(response.data.post, function(value, key){

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

            if(angular.isUndefined(user.remember)){
                user.remember = false;
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
                .then(function(response) {

                    $(window).attr('location', $scope.domain);
                    // console.log('success: ' + response.data.success);

                })
                .catch(function () {

                });
        };

        $scope.logout = function(){

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {

                    FB.logout(function(response) {
                        // Person is now logged out
                    });

                }
            });

        };

        //signup function
        $scope.signup = function (user) {

            user.birthday = user.year + '-' + user.month + '-' + user.date;

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
                    FBaccess: user.FBaccess
                })
            })
                .then(function(response) {

                    // $(window).attr('location', $scope.domain);

                })
                .catch(function () {

                });
        };

        //gets single post
        $scope.getSinglePost = function(postID){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/singlePost",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    postID: postID
                })
            })
                .then(function(response) {

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
        $scope.getCommentList = function(){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/getComments",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    postID: $rootScope.post_id
                })
            })
                .then(function(response) {

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
        $scope.postComment = function(user, type, comment, orginialUser){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/post_comment",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
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
                .then(function(response) {

                    if (response.data.success) {
                        $scope.user_stats = response.data.user_info.data;
                        $scope.loggedIn = true;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                })
                .finally(function(){
                    $scope.getCommentList();
                });

        };

        //carousel items
        $scope.carouselItems = function(){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/carouselItems",
                method: "GET",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function(response) {

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
        $scope.contactUs = function(contact){

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
                .then(function(response) {

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
        $scope.grabGamesList = function(){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/grabGameList",
                method: "GET",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function(response) {

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
        $scope.friendsList = function(user){

            console.log($scope.user);

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/friendsList",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    userID: 1
                })
            })
                .then(function(response) {

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
        $scope.userFeed = function(user){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/userFeed",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    userID: user.ID
                })
            })
                .then(function(response) {

                    if (response.data.success) {
                        $scope.feed = response.data.feed;
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //user feed comments
        $scope.userFeedCom = function(com, par){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/userUpdate",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    userID: $scope.user.ID,
                    comment: com,
                    comment_parent: par
                })
            })
                .then(function(response) {

                    if (response.data.success) {
                        $scope.com = "";

                    } else {
                        console.error(response.data.error_message);
                    }

                })
                .catch(function () {

                })
                .finally(function(){

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

            if($scope.offset > 0) {

                $scope.offset -= 6;
                $scope.get_post($scope.def_post, $scope.offset);

            }

        };

        $scope.uploadImg = function(){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/updateImg",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    blobImg: files
                })
            })
                .then(function(response) {

                    if (response.data.success) {

                        $scope.current_post = response.data.post;

                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });

        };

        //Facebook login
        $scope.fbLogin = function(){
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {

                    console.log('Logged In');

                }
                else {
                    // $scope.fbData.user_ID = response.authResponse.userID;
                    FB.login(function(response) {

                        // handle the response
                        // console.log(response.authResponse);
                        $scope.fbData.userID = response.authResponse.userID;
                        $scope.fbData.FBaccess = response.authResponse.accessToken;
                        // console.log($scope.fbData);

                        FB.api(
                            "/" + $scope.fbData.userID + "?fields=email,birthday,first_name,last_name,gender",
                            function (response) {
                                if (response && !response.error) {

                                    /* handle the result */
                                    $scope.fbData.first_name = response.first_name;
                                    $scope.fbData.last_name = response.last_name;
                                    $scope.fbData.email = response.email;
                                    $scope.fbData.gender = response.gender;
                                    $scope.fbData.birthday = response.birthday;

                                    console.log($scope.fbData);

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

        //returns string into json format
        $scope.jsonReturn = function(data) {

            return JSON.stringify(data);

        };

        $(document).scrollTop(0);

        var loaded = 0;
        var imgCounter = $(".main-content img").length;
        if(imgCounter > 0){
            console.log(imgCounter);
            function doProgress() {
                $(".main-content img").load(function() {
                    loaded++;
                    var newWidthPercentage = (loaded / imgCounter) * 100;
                    animateLoader(newWidthPercentage + '%');
                })
            }
            function animateLoader(newWidth) {
                $("#progressBar").width(newWidth);
                if(imgCounter === loaded){
                    setTimeout(function(){
                        $("#progressBar").animate({opacity:0});
                    },500);
                }
            }
            doProgress();
        }
        else{
            setTimeout(function(){
                $("#progressBar").css({
                    "opacity":0,
                    "width":"100%"
                });
            },500);
        }

        // Activates Tooltips for Social Links
        $('[data-toggle="tooltip"]').tooltip();

        // Activates Popovers for Social Links
        $('[data-toggle="popover"]').popover();

        //*** Refresh Content ***//
        $('.refresh-content').on("click", function(){
            $(this).parent().parent().addClass("loading-wait").delay(3000).queue(function(next){
                $(this).removeClass("loading-wait");
                next();
            });
            $(this).addClass("fa-spin").delay(3000).queue(function(next){
                $(this).removeClass("fa-spin");
                next();
            });
        });

        //*** Expand Content ***//
        $('.expand-content').on("click", function(){
            $(this).parent().parent().toggleClass("expand-this");
        });

        //*** Delete Content ***//
        $('.close-content').on("click", function(){
            $(this).parent().parent().slideUp();
        });

        // Activates Tooltips for Social Links
        $('.tooltip-social').tooltip({
            selector: "a[data-toggle=tooltip]"
        });

        var handle_nav = function(e) {
            e.preventDefault();
            var nav = $(this);
            nav.parents('.carousel').carousel(nav.data('slide'));
        };

        $('.carousel').carousel({
            interval: 5000,
            pause: "hover",
            wrap: true
        })
            .on('click', '.carousel-control', handle_nav);

        $('#1').addClass('active');

        //FaceBook SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId            : '220252511670899',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.10'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }
);