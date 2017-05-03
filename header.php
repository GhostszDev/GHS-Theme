<!DOCTYPE html>
<html ng-app="GHS_mod" ng-controller="GHS_ctrl">

<head>
    <?php wp_head(); ?>
</head>
<body>

<!--<section data-ng-include="'templates/panel.html'"></section>-->

<div class="slide-panel" id="panel-scroll">
    <ul role="tablist" class="nav nav-tabs panel-tab-btn">
        <li class="active"><a data-toggle="tab" role="tab" data-target="#panel-tab1"><i class="ti-email"></i><span>Your Emails</span></a></li>
        <li><a data-toggle="tab" role="tab" data-target="#panel-tab2"><i class="ti-settings"></i><span>Your Setting</span></a></li>
    </ul>
    <div class="tab-content panel-tab">
        <div id="panel-tab1" class="tab-pane fade in active">
            <div class="recent-mails-widget">
                <form><div id="searchMail"></div></form>
                <h3>Recent Emails</h3>
                <ul id="mail-list" class="mail-list">
                    <li>
                        <div class="title">
                            <span><img src="http://placehold.it/40x40" alt="" /><i class="online"></i></span>
                            <h3><a href="#" title="">Kim Hostwood</a><span>5 min ago</span></h3>
                            <a href="#"  data-toggle="tooltip" data-placement="left" title="Attachment"><i class="ti-clip"></i></a>
                        </div>
                        <h4>Themeforest Admin Template</h4>
                        <p>This product is so good that i manage to buy.</p>
                    </li>
                    <li>
                        <div class="title">
                            <span><img src="http://placehold.it/40x40" alt="" /><i class="online"></i></span>
                            <h3><a href="#" title="">John Doe</a><span>2 hours ago</span></h3>
                            <a href="#"  data-toggle="tooltip" data-placement="left" title="Attachment"><i class="ti-clip"></i></a>
                        </div>
                        <h4>Themeforest Admin Template</h4>
                        <p>This product is so good that i manage to buy.</p>
                    </li>
                    <li>
                        <div class="title">
                            <span><img src="http://placehold.it/40x40" alt="" /><i class="offline"></i></span>
                            <h3><a href="#" title="">Jonathan Doe</a><span>8 min ago</span></h3>
                            <a href="#"  data-toggle="tooltip" data-placement="left" title="Attachment"><i class="ti-clip"></i></a>
                        </div>
                        <h4>Themeforest Admin Template</h4>
                        <p>This product is so good that i manage to buy.</p>
                    </li>
                </ul>
                <a href="#/mail" title="" class="purple">View All Messages</a>
            </div><!-- Recent Email Widget -->

            <div class="file-transfer-widget">
                <h3>FILE TRANSFER</h3>
                <div class="toggle">
                    <ul>
                        <li>
                            <i class="ti-file"></i><h4>my-excel.xls<i>20 min ago</i></h4>
                            <div class="progress">
                                <div style="width: 90%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" role="progressbar" class="progress-bar red">
                                    90%
                                </div>
                            </div>
                            <div class="file-action-btn">
                                <a href="#" title="Approve" class="green" data-toggle="tooltip" data-placement="bottom"><i class="ti-check"></i></a>
                                <a href="#" title="Cancel" class="red" data-toggle="tooltip" data-placement="bottom"><i class="ti-close"></i></a>
                            </div>
                        </li>
                        <li>
                            <i class="ti-zip"></i><h4>my-cv.pdf<i>8 min ago</i></h4>
                            <div class="progress">
                                <div style="width: 40%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="40" role="progressbar" class="progress-bar blue">
                                    40%
                                </div>
                            </div>
                            <div class="file-action-btn">
                                <a href="#" title="Approve" class="green" data-toggle="tooltip" data-placement="bottom"><i class="ti-check"></i></a>
                                <a href="#" title="Cancel" class="red" data-toggle="tooltip" data-placement="bottom"><i class="ti-close"></i></a>
                            </div>
                        </li>
                        <li>
                            <i class="ti-files"></i><h4>portfolio-shoot.mp4<i>12 min ago</i></h4>
                            <div class="progress">
                                <div style="width: 70%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar" class="progress-bar green">
                                    70%
                                </div>
                            </div>
                            <div class="file-action-btn">
                                <a href="#" title="Approve" class="green" data-toggle="tooltip" data-placement="bottom"><i class="ti-check"></i></a>
                                <a href="#" title="Cancel" class="red" data-toggle="tooltip" data-placement="bottom"><i class="ti-close"></i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div><!-- File Transfer -->
        </div>
        <div id="panel-tab2" class="tab-pane fade">
            <div class="setting-widget">
                <form>
                    <h3>Accounts</h3>
                    <div class="toggle-setting">
                        <span>Office Account</span>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>Personal Account</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>Business Account</span>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                </form>

                <form>
                    <h3>General Setting</h3>
                    <div class="toggle-setting">
                        <span>Notifications</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>Notification Sound</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>My Profile</span>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>Show Online</span>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                    <div class="toggle-setting">
                        <span>Public Profile</span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span data-unchecked="Off" data-checked="On"></span>
                        </label>
                    </div>
                </form>
            </div><!-- Setting Widget -->
        </div>
    </div>
</div><!-- Slide Panel -->

<div class="top-bar">
    <div class="menu-options"><span class="menu-action"><i></i></span></div>
<!--    <span class="slide-bar-btn">-->
<!--          <i class="fa fa-align-left"></i>-->
<!--     </span>-->
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
<!--        <div class="message-list dropdown">-->
<!--            <a title=""><span class="green">3</span><i class="ti-email"></i></a>-->
<!--            <div class="message drop-list">-->
<!--                <span>You have 4 New Messages</span>-->
<!--                <ul>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Labrina Scholer</i>Hi! How are you?...<h6>2 min ago..</h6><p class="status blue">New</p></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Jonathan</i>Hi! How are you?...<h6>2 min ago..</h6><p class="status red">Unsent</p></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Barada knol</i>Hi! How are you?...<h6>2 min ago..</h6><p class="status green">Reply</p></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Samtha Gee</i>Hi! How are you?...<h6>2 min ago..</h6><p class="status">New</p></a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--                <a href="inbox.html" title="">See All Messages</a>-->
<!--            </div>-->
<!--        </div><!-- Message List -->
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
<!--        <div class="activity-list dropdown">-->
<!--            <a title=""><span class="purple">8</span><i class="ti-briefcase"></i></a>-->
<!--            <div class="activity drop-list">-->
<!--                <span>Recent Activity</span>-->
<!--                <ul>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Jona Than</i>Uploading new files<h6>2 min ago..</h6><p class="status green">Online</p></a>-->
<!--                        <div class="progress">-->
<!--                            <div style="width: 60%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60" role="progressbar" class="progress-bar purple">-->
<!--                                60%-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="#" title=""><span><img src="http://placehold.it/40x40" alt="" /></span><i>Bela Nisaa</i>Downloading new Documents<h6>2 min ago..</h6></a>-->
<!--                        <div class="progress">-->
<!--                            <div style="width: 34%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="34" role="progressbar" class="progress-bar red">-->
<!--                                34%-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->
<!--                </ul>-->
<!--                <a href="#" title="">See All Activity</a>-->
<!--            </div>-->
<!--        </div><!-- Activity List -->
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
                    <li><a data-toggle="tooltip" data-placement="bottom" title="Go to Profile" href="#"><i class="fa fa-user"></i></a></li>
                    <li><a data-toggle="tooltip" data-placement="bottom" title="Log Out" href="<?php echo wp_logout_url( home_url() ); ?>"><i class="fa fa-sign-out"></i></a></li>
<!--                    <li><a data-toggle="tooltip" data-placement="bottom" title="Full Screen" id="toolFullScreen"><i class="fa fa-arrows-alt"></i></a></li>-->
                </ul>
            </div>
            <div class="quick-stats">
<!--                <h5>Today Report</h5>-->
<!--                <ul>-->
<!--                    <li><span>456<i>Sales</i></span></li>-->
<!--                    <li><span>2,345<i>Order</i></span></li>-->
<!--                    <li><span>$120<i>Revenue</i></span></li>-->
<!--                </ul>-->
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
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-desktop"></i><span>Dashboard <i class="red">HOT</i></span></a>-->
<!--                    <ul>-->
<!--                        <li><a href="#/" title="">Dashboard 1</a></li>-->
<!--                        <li><a href="#/dashboard-2" title="">Dashboard 2</a></li>-->
<!--                        <li><a href="#/dashboard-3">Dashboard 3</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-email"></i><span>Mail Box <i class="purple">NEW</i></span></a>-->
<!--                    <ul>-->
<!--                        <li><a href="#/pages/inbox">Inbox</a></li>-->
<!--                        <li><a href="#/pages/compose">Compose Email</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a href="#/pages/widgets" title=""><i class="ti-bolt"></i><span>Widgets</span></a>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-paint-roller"></i><span>Icons</span></a>-->
<!--                    <ul>-->
<!--                        <li><a href="#/pages/font-awesome">Font Awesome</a></li>-->
<!--                        <li><a href="#/pages/themify-icons">Themify Icons</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a href="#/pages/rich-charts"><i class="ti-pie-chart"></i><span>Charts</span></a>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-pencil"></i><span>Pages</span></a>-->
<!--                    <ul class="mega">-->
<!--                        <li><a href="#/pages/blank">Blank</a></li>-->
<!--                        <li><a href="#/pages/blog">Blog</a></li>-->
<!--                        <li><a href="#/pages/single-post">Single Post</a></li>-->
<!--                        <li><a href="#/pages/404">404 Page</a></li>-->
<!--                        <li><a href="#/pages/505">505 Page</a></li>-->
<!--                        <li><a href="#/pages/contact">Contact Us</a></li>-->
<!--                        <li><a href="#/pages/google-map">Google Map</a></li>-->
<!--                        <li><a href="#/pages/vector-map">Vector Map</a></li>-->
<!--                        <li><a href="#/pages/invoice">Invoice</a></li>-->
<!--                        <li><a href="#/pages/search-not-found">No Search Result</a></li>-->
<!--                        <li><a href="#/pages/search-found">Search Found</a></li>-->
<!--                        <li><a href="#/pages/faq">FAQ Page</a></li>-->
<!--                        <li><a href="coming-soon.html">Coming soon</a></li>-->
<!--                        <li><a href="#/pages/our-team">Our Team</a></li>-->
<!--                        <li><a href="#/pages/our-team2">Our Team 2</a></li>-->
<!--                        <li><a href="#/pages/scroll-box">ScrollBox</a></li>-->
<!--                        <li><a href="#/pages/services">Services</a></li>-->
<!--                        <li><a href="#/pages/services2">Services 2</a></li>-->
<!--                        <li><a href="#/pages/services3">Services 3</a></li>-->
<!--                        <li><a href="#/pages/portfolio">Portfolio</a></li>-->
<!--                        <li><a href="#/pages/portfolio2">Portfolio 2</a></li>-->
<!--                        <li><a href="#/pages/profile">My Profile</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-rocket"></i><span>Shop <i class="green">NEW</i></span></a>-->
<!--                    <ul>-->
<!--                        <li><a href="#/pages/product">Product</a></li>-->
<!--                        <li><a href="#/pages/product2">Product 2</a></li>-->
<!--                        <li><a href="#/pages/cart">Cart</a></li>-->
<!--                        <li><a href="#/pages/single-product">Single Product</a></li>-->
<!--                        <li><a href="#/pages/checkout">Checkout</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-heart"></i><span>UI Elements <i class="red">20+</i></span></a>-->
<!--                    <ul class="mega">-->
<!--                        <li><a href="#/pages/inbox">Inbox</a></li>-->
<!--                        <li><a href="#/pages/compose">Compose Email</a></li>-->
<!--                        <li><a href="#/pages/profile">My Profile</a></li>-->
<!--                        <li><a href="#/pages/buttons">Buttons</a></li>-->
<!--                        <li><a href="#/pages/timeline">Timeline</a></li>-->
<!--                        <li><a href="#/pages/typography">Typography</a></li>-->
<!--                        <li><a href="#/pages/calendar">Calendar</a></li>-->
<!--                        <li><a href="#/pages/upload-crop">Upload Crop</a></li>-->
<!--                        <li><a href="#/pages/tour">Page Tour</a></li>-->
<!--                        <li><a href="#/pages/collapse">Collapse</a></li>-->
<!--                        <li><a href="#/pages/forms">Form Stuff</a></li>-->
<!--                        <li><a href="#/pages/grids">Grids</a></li>-->
<!--                        <li><a href="#/pages/notification">Notifications</a></li>-->
<!--                        <li><a href="#/pages/price-table">Price Table</a></li>-->
<!--                        <li><a href="#/pages/price-table2">Price Table 2</a></li>-->
<!--                        <li><a href="#/pages/range-slider">Range Slider</a></li>-->
<!--                        <li><a href="#/pages/sort-block">Sortable</a></li>-->
<!--                        <li><a href="#/pages/basic-tables">Basic Tables</a></li>-->
<!--                        <li><a href="#/pages/tabular-table">Tabular Tables</a></li>-->
<!--                        <li><a href="#/pages/task-dynamic">My Tasks</a></li>-->
<!--                        <li><a href="#/pages/task-simple">Todo Lists</a></li>-->
<!--                        <li><a href="#/pages/progress-bar">Progress Bar</a></li>-->
<!--                        <li><a href="#/pages/popovers">Popovers</a></li>-->
<!--                        <li><a href="#/pages/navbars">Navbars</a></li>-->
<!--                        <li><a href="#/pages/calculator">Calculator</a></li>-->
<!--                        <li><a href="#/pages/paginations">Paginations</a></li>-->
<!--                        <li><a href="#/pages/tooltips">Tooltips</a></li>-->
<!--                        <li><a href="#/pages/ribbon-grids">Ribbon Grids</a></li>-->
<!--                        <li><a href="#/pages/css-spinners">Css Spinners</a></li>-->
<!--                        <li><a href="#/pages/gallery">Gallery</a></li>-->
<!--                        <li><a href="#/pages/gallery2">Gallery 2</a></li>-->
<!--                        <li><a href="#/pages/order-received">Order Received</a></li>-->
<!--                        <li><a href="maintenance.html">Maintenance</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li class="menu-item-has-children">-->
<!--                    <a title=""><i class="ti-rocket"></i><span>Extras <i class="green">HOT</i></span></a>-->
<!--                    <ul>-->
<!--                        <li><a href="#/pages/reset-password">Reset Password</a></li>-->
<!--                        <li><a href="#/pages/forgot-password">Forgot Password</a></li>-->
<!--                        <li><a href="#/pages/login">Login</a></li>-->
<!--                        <li><a href="#/pages/signup">Sign up</a></li>-->
<!--                        <li><a href="#/pages/lockscreen">Lockscreen</a></li>-->
<!--                        <li><a href="#/pages/checkout">Checkout</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
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
