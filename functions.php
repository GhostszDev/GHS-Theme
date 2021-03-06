<?php
/**
 * Created by IntelliJ IDEA.
 * User: dev
 * Date: 2/3/17
 * Time: 5:47 PM
 */

//adding actions
add_action('wp_head', 'ghs_head');
add_action('after_setup_theme', 'ghs_theme_support');
add_action( 'wp_enqueue_scripts', 'ghs_scrs' );
//add_action('login_form', 'redirect_to_front_page');
add_action('wp_logout','go_home');
add_action('init', 'user_page_temp', 10, 0);
add_action('init', 'user_page_tags', 10, 0);

//adding filters
add_filter('show_admin_bar', '__return_false');
add_filter('comment_flood_filter', '__return_false');

function ghs_scrs() {

    //styles
    wp_enqueue_style( 'bootstrap', get_stylesheet_directory_uri() . '/css/bootstrap.min.css');
    wp_enqueue_style( 'icons', get_stylesheet_directory_uri() . '/css/icons.css');
    wp_enqueue_style( 'datecss', get_stylesheet_directory_uri() . '/css/bootstrap-datetimepicker.min.css');
    wp_enqueue_style( 'main', get_stylesheet_directory_uri() . '/css/main.css');
    wp_enqueue_style( 'responsive', get_stylesheet_directory_uri() . '/css/responsive.css');
    wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/style.css');

    //scripts
    wp_enqueue_script('jq', get_stylesheet_directory_uri() . '/js/jquery-2.1.3.js');
    wp_enqueue_script('angularjs', get_stylesheet_directory_uri() . '/js/angular.min.js');
    wp_enqueue_script('angularjs-resource', get_stylesheet_directory_uri() . '/js/angular-resource.min.js');
    wp_enqueue_script('angularjs-route',  get_stylesheet_directory_uri() . '/js/angular-route.min.js');
    wp_enqueue_script('cookies',  get_stylesheet_directory_uri() . '/js/cookies.js');
    wp_enqueue_script('BSJS',  get_stylesheet_directory_uri() . '/js/bootstrap.min.js');
    wp_enqueue_script('UIBS',  get_stylesheet_directory_uri() . '/js/ui-bootstrap.min.js');
//    wp_enqueue_script('main', get_stylesheet_directory_uri() . '/js/main.js');
    wp_enqueue_script('moment', get_stylesheet_directory_uri() . '/js/moment.js');
    wp_enqueue_script('date', get_stylesheet_directory_uri() . '/js/bootstrap-datetimepicker.min.js');
    wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.js');
    wp_enqueue_script('gapi', 'https://apis.google.com/js/platform.js?onload=renderButton');
    wp_enqueue_script('GhsJS', get_stylesheet_directory_uri() . '/js/GhsJS.js', array( 'angularjs', 'angularjs-route', 'jq', 'app', 'BSJS', 'UIBS', 'moment', 'date', 'gapi', 'cookies'), true);

    //localization of scripts
    wp_localize_script('GhsJS', 'myLocalized', array('partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'));
}

function ghs_head(){
    ?>

    <title><?php

        if(is_home()){
            echo ucwords(get_bloginfo( 'name' ));
        } else {
            echo ucwords(wp_title( ' | ', false, 'right' ) . get_bloginfo( 'name' ));
        }
        ?></title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="google-signin-client_id" content="979177383237-vevih7vk4k8niblajr70uu1qfbesapt0.apps.googleusercontent.com">
    <link rel="shortcut icon" type="image/x-icon" href="https://ghostszmusic.com/wp-content/uploads/2016/03/favicon.ico" />
    <base href="<?php echo site_url('/'); ?>">

    <?php
    global $wp_query;
    $user = $wp_query->query_vars['user'];
    ?>

    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

    <script>
        var site = "<?php echo site_url('/'); ?>";
        var post_id = '';
        var user = "<?php echo $user?>";

        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-7680033929285765",
            enable_page_level_ads: true
        });

        //        <!-- Google Tag Manager -->
        //        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        //            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        //            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        //            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        //        })(window,document,'script','dataLayer','GTM-MJVJMX7');
        //    <!-- End Google Tag Manager -->


        <!-- Facebook Pixel Code -->
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '718855828322940');
        fbq('track', 'PageView');
    </script>

    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=718855828322940&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->


<?php
}

function ghs_theme_support(){

    add_theme_support( 'html5', array(
        'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' )
    );

    add_theme_support('post-formats', array(
        'aside',
        'gallery',
        'image',
        'video',
        'audio'
    ));

    add_theme_support( 'woocommerce' );
    add_theme_support('post-thumbnails');

}

function redirect_to_front_page() {

    global $redirect_to;
    if (!isset($_GET['redirect_to'])) {
        $redirect_to = get_option('siteurl');
    }
}

function go_home(){

    if(isset($_COOKIE['token'])){
        unset($_COOKIE['token']);
    }

    wp_redirect( home_url() );
    exit();

}

function user_page_temp(){

    add_rewrite_rule('^user-profile/([^/]*)/?','index.php?page_id=372&user=$matches[1]','top');

}

function user_page_tags(){

    add_rewrite_tag('%user%', '([^&]+)');

}