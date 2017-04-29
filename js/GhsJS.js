angular.module('GHS_mod', ['ngRoute', 'ui.bootstrap'])
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
        $scope.notifications = [];
        $scope.employee = [
            {name: 'Steven "Ghost" Rivera', position: 'Founder/Owner', desc: 'I want to inspire the massive by creating the greatest games I possibly can.', img: 'https://pbs.twimg.com/profile_images/834395726469877766/spmuKxO_.jpg', fb_link: 'https://www.facebook.com/GhostszLife', t_link: 'https://twitter.com/HoodieDork', yt_link: 'https://www.youtube.com/user/ghostszmusic?sub_confirmation=1'}
        ];
        $scope.def_post = {
            post_num: 6,
            cat: ''
        };
        $scope.related_def = {
            post_num: 3,
            cat: cat
        };
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.comments = [];
        $scope.comment = '';

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
        $scope.get_post = function(post){

            $http({
                url: $scope.domain + "wp-json/ghs_api/v1/ghs_post",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    post_num: post.post_num,
                    cat: post.cat,
                    ex: post_id

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
                    birthday: user.birthday
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
        }else{
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

    }
);