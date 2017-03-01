angular.module('GHS_mod', ['ngRoute'])
    .controller('GHS_ctrl', function($http, $scope, $httpParamSerializerJQLike, $location, $rootScope, $sce) {

        $scope.main_url = '/wp-content/theme/GHS-Theme/partials/main.html';
        $rootScope.post_id = '';

        'use strict';
        //***** Side Menu *****//
        $scope.close = function() {
            $('.side-menus li.menu-item-has-children > a').on('click', function () {
                $(this).parent().siblings().children('ul').slideUp();
                $(this).parent().siblings().removeClass('active');
                $(this).parent().children('ul').slideToggle();
                $(this).parent().toggleClass('active');
                return false;
            });
        };

        //params
        $scope.openMenu = false;
        $scope.loggedIn = false;
        $scope.user_stats = [];
        $scope.user = [];
        $scope.related = [];
        $scope.post = [];
        $scope.notifications = [];
        $scope.def_post = {
            post_num: 6,
            cat: ''
        };
        $scope.related_def = {
            post_num: 3,
            cat: cat
        };

        $scope.trustAsHtml = $sce.trustAsHtml;

        //get some post
        $scope.get_post = function(post){

            $http({
                url: "http://ghostszmusic.dev/wp-json/ghs_api/v1/ghs_post",
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
                url: "http://ghostszmusic.dev/wp-json/ghs_api/v1/login",
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

                    if (response.data.success) {
                        $scope.user_stats = response.data.user_info.data;
                        $scope.loggedIn = true;
                        window.location.href = '/index.php';
                    } else {
                        console.log(response.data.error_message);
                    }

                })
                .catch(function () {

                });
        };

        //signup function
        $scope.signup = function (user) {

            $http({
                url: "http://ghostszmusic.dev/wp-json/ghs_api/v1/login",
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
                    mailing: user.mailing
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

                });
        };

        //post comment
        $scope.postComment = function(comment){

            $http({
                url: "http://ghostszmusic.dev/wp-json/ghs_api/v1/post_comment",
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    comment_id: '',
                    user_name: '',
                    user_email: '',
                    comment: '',
                    comment_type: '',
                    user_id: ''
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

                });

        };

    });


$(document).ready(function(){

    'use strict';

    //**** Slide Panel Toggle ***//
    $(".slide-bar-btn").on('click', function(){
        $(".slide-bar-btn").toggleClass('active');
        $(".slide-panel").toggleClass('active');
    });

    //***** Clients lists Scroll *****//
    $(function(){
        $('#panel-scroll').slimScroll({
            height: '100%',
            wheelStep: 10,
            distance : '0px',
            color:'#878787',
            railOpacity : '0.1',
            size: '2px'
        });
    });

    /* Copyright (c) 2013 ; Licensed  */
    //Sort by first name
    $(function() {
        $.fn.sortList = function() {
            var mylist = $(this);
            var listitems = $('li', mylist).get();
            listitems.sort(function(a, b) {
                var compA = $(a).text().toUpperCase();
                var compB = $(b).text().toUpperCase();
                return (compA < compB) ? -1 : 1;
            });
            $.each(listitems, function(i, itm) {
                mylist.append(itm);
            });
        }
    });

    //Sort by last name
    $(function() {
        $.fn.sortListLast = function() {
            var mylist = $(this);
            var listitems = $('li', mylist).get();
            listitems.sort(function(a, b) {
                var compA = $('.last-name', a).text().toUpperCase();
                var compB = $('.last-name', b).text().toUpperCase();
                return (compA < compB) ? -1 : 1;
            });
            $.each(listitems, function(i, itm) {
                mylist.append(itm);
            });
        }
    });

    //Search filter
    (function ($) {
        // custom css expression for a case-insensitive contains()
        jQuery.expr[':'].Contains = function(a,i,m){
            return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
        };


        function listFilter(searchDir, list) {
            var form = $("<form>").attr({"class":"filterform","action":"#"}),
                input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Live Search Mails"});
            $(form).append(input).appendTo(searchDir);

            $(input)
                .change( function () {
                    var filter = $(this).val();
                    if(filter) {
                        $(list).find("li:not(:Contains(" + filter + "))").slideUp();
                        $(list).find("li:Contains(" + filter + ")").slideDown();
                    } else {
                        $(list).find("li").slideDown();
                    }
                    return false;
                })
                .keyup( function () {
                    $(this).change();
                });
        }


        //Slide Panel Search Email
        $(function () {
            listFilter($("#searchMail"), $("#mail-list"));
        });

    }(jQuery));


});