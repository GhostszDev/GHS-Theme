<!DOCTYPE html>
<html ng-app="GHS_mod" ng-controller="GHS_ctrl">

<head>
    <?php wp_head(); ?>
</head>
<body>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MJVJMX7"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="top-bar">
    <div class="menu-options"><span class="menu-action"><i></i></span></div>
    <div class="admin-name-hello">
        <?php if(is_user_logged_in()){ ?>
            <script>
                var user_id = "<?php echo get_current_user_id(); ?>";
//                console.log(user_id);
            </script>

        <span ng-init="getUser();"> <img ng-src="{{user.user_icon}}" /> </span>
        <?php }else{ ?>
            <p style="margin-top: 13px;"><a href="<?php echo site_url('/login'); ?>"><i class="fa fa-sign-in"> Login</i></a></p>
        <?php } ?>
    </div>
    <div class="custom-dropdowns">
        <div class="notification-list dropdown">
            <a title=""><span class="red">0</span><i class="ti-bell"></i></a>
            <div class="notification drop-list">
                <span>You have 0 New Notifications</span>
                <ul>
                    <li ng-repeat="n in notifications">
                        <a href="n.link" title=""><span><i class="ti-pulse red"></i></span>n.msg <h6>n.time</h6></a>
                    </li>
                </ul>
                <a href="#" title="">See All Notifications</a>
            </div>
        </div><!-- Notification List -->
    </div>
</div><!-- Top bar -->
<header class="side-header opened-menu">
    <div id="header-scroll">
        <div class="logo">
            <a href="/" title="">
                <i>
                    <img src="https://ghostszmusic.com/wp-content/uploads/2016/02/cropped-logo-e1484926667618.png" style="width: 35px;">
                </i>
                <span><?php echo ucfirst(get_bloginfo('name')); ?></span>
                <p>Games, Music & More</p>
            </a>
        </div>
        <?php if(is_user_logged_in()){ ?>
        <div class="admin-action-bar">
            <div class="admin-image">
                <img ng-src="{{user.user_icon_big}}" alt="" />
            </div>
            <div class="admin-action-info">
                <span>Welcome</span>
                <h3>{{user.userName}}</h3>
                <ul>
                    <li><a data-toggle="tooltip" data-placement="bottom" title="Go to Inbox" href="#"><i class="fa fa-envelope-o"></i></a></li>
                    <li><a data-toggle="tooltip" data-placement="bottom" title="Go to Profile" ng-href="{{domain + 'user-profile/' + user.userName}}"><i class="fa fa-user"></i></a></li>
                    <li><a data-toggle="tooltip" data-placement="bottom" title="Log Out" ng-click="logout()" href="<?php echo wp_logout_url( home_url() ); ?>"><i class="fa fa-sign-out"></i></a></li>
                </ul>
            </div>

        </div>
        <?php } ?>

        <div class="search-form">
            <input ng-model="search.text" type="text" placeholder="Search" style="width: 211px !important;"/>
            <button type="submit" ng-click="search_box(search)"><i class="fa fa-search"></i></button>
        </div><!-- Search Form -->

        <nav class="side-menus">
            <ul class="parent-menu">
                <li>
                    <a href="<?php echo site_url('/'); ?>" title="Home"><i class="fa fa-home"></i><span>Home</span></a>
                </li>
                <li>
                    <a href="<?php echo site_url('/blog'); ?>" title="Blog"><i class="fa fa-book"></i><span>Blog</span></a>
                </li>
                <li>
                    <a href="<?php echo site_url('/about-us'); ?>" title="About Us"><i class="fa fa-bookmark"></i><span>About Us</span></a>
                </li>
                <li class="menu-item-has-children">
                    <a title="Media" ng-click="close()"><i class="fa fa-users"></i><span>Media</span></a>
                    <ul>
                        <li><a href="<?php echo site_url('/games'); ?>" title="Games">Games</a></li>
                    </ul>
                </li>
                <li>
                    <a href="<?php echo site_url('/shop'); ?>" title="Shop"><i class="fa fa-shopping-bag"></i><span>Shop</span></a>
                </li>
                <li>
                    <a href="<?php echo site_url('/contact'); ?>" title="Contact Us"><i class="fa fa-envelope"></i><span>Contact Us</span></a>
                </li>
                <li>
                    <div class="fancy-social">
                        <span>Contact with us</span>
                        <a href="https://www.facebook.com/officialghostszmusic" title="Follow us on Facebook"><i class="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/GhostszMusic" title="Follow us on Twitter"><i class="fa fa-twitter"></i></a>
                        <a href="https://ghostdevblog.tumblr.com/" title="Follow us on Tumblr"><i class="fa fa-tumblr"></i></a>
                        <a href="https://www.instagram.com/ghostszmusic/" title="Follow us on Instagram"><i class="fa fa-instagram"></i></a>
                        <a href="https://www.youtube.com/user/ghostszmusic?sub_confirmation=1" title="Subscribe to us on Youtube"><i class="fa fa-youtube-play"></i></a>
                        <a href="https://github.com/GhostszDev" title="GhostszMusic on Github"><i class="fa fa-github"></i></a>
                    </div><!-- Fancy Social -->
                </li>
            </ul>
        </nav>
        <span class="footer-line">&copy; 2014 – <?php echo date('Y'); ?> <br />GhostszMusic INC</span>
    </div>
</header>
<script type='text/javascript'>
    $(document).ready(function(){

        'use strict';
        //***** Side Menu *****//
        $('.side-menus li.menu-item-has-children > a').on('click',function(){
            $(this).parent().siblings().children('ul').slideUp();
            $(this).parent().siblings().removeClass('active');
            $(this).parent().children('ul').slideToggle();
            $(this).parent().toggleClass('active');
            return false;
        });

        //***** Toggle Full Screen *****//
        function goFullScreen() {
            var
                el = document.documentElement
                , rfs =
                    el.requestFullScreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
                    || el.msRequestFullscreen

                ;
            rfs.call(el);
        }
        $("#toolFullScreen").on("click",function() {
            goFullScreen();
        });

        //***** Clients lists Scroll *****//
        $(function(){
            $('#header-scroll').slimScroll({
                height: '100%',
                wheelStep: 10,
                distance : '0px',
                color:'#878787',
                railOpacity : '0.1',
                size: '2px'
            });
        });

        //**** Message Dropdown ***//
        $('.message-list.dropdown > a').click(function(e) {
            $('.message.drop-list').stop(true, true).fadeIn('fast');
            $('.notification.drop-list:visible').stop(true, true).fadeOut('fast');
            $('.activity.drop-list:visible').stop(true, true).fadeOut('fast');
            e.stopPropagation();
        });

        $('body').click(function () {
            $('.message.drop-list:visible').stop(true, true).fadeOut('fast');
        });

        //**** Notification Dropdown ***//
        $('.notification-list.dropdown > a').click(function(e) {
            $('.notification.drop-list').stop(true, true).fadeIn('fast');
            $('.message.drop-list:visible').stop(true, true).fadeOut('fast');
            $('.activity.drop-list:visible').stop(true, true).fadeOut('fast');
            e.stopPropagation();
        });

        $('body').click(function () {
            $('.notification.drop-list:visible').stop(true, true).fadeOut('fast');
        });

        //**** Activity Dropdown ***//
        $('.activity-list.dropdown > a').click(function(e) {
            $('.activity.drop-list').stop(true, true).fadeIn('fast');
            $('.notification.drop-list:visible').stop(true, true).fadeOut('fast');
            $('.message.drop-list:visible').stop(true, true).fadeOut('fast');
            e.stopPropagation();
        });

        $('body').click(function () {
            $('.activity.drop-list:visible').stop(true, true).fadeOut('fast');
        });

        //**** Profile Dropdown ***//
        $('.profile.dropdown > a').click(function(e) {
            $('.profile.drop-list').stop(true, true).fadeIn('fast');
            e.stopPropagation();
        });

        //***** Side Menu Option *****//
        $('.menu-options').on('click', function(){
            $('.side-header.opened-menu').toggleClass('slide-menu');
            $('.main-content').toggleClass('wide-content');
            $('.top-bar').toggleClass('wide-bar');
            $('.menu-options').toggleClass('active');
        });

    });

    var cat = '';
    var post_id = '';

</script>
