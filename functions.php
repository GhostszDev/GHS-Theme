<?php
/**
 * Created by IntelliJ IDEA.
 * User: dev
 * Date: 2/3/17
 * Time: 5:47 PM
 */

function ghs_scrs() {

    //styles
    wp_enqueue_style( 'bootstrap', get_stylesheet_directory_uri() . '/css/bootstrap.min.css');
    wp_enqueue_style( 'icons', get_stylesheet_directory_uri() . '/css/icons.css');
    wp_enqueue_style( 'main', get_stylesheet_directory_uri() . '/css/main.css');
    wp_enqueue_style( 'responsive', get_stylesheet_directory_uri() . '/css/responsive.css');
    wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/style.css');

    //scripts
    wp_enqueue_script('jq', get_stylesheet_directory_uri() . '/js/jquery-2.1.3.js');
    wp_enqueue_script('angularjs', get_stylesheet_directory_uri() . '/js/angular.min.js');
    wp_enqueue_script('angularjs-resource', get_stylesheet_directory_uri() . '/js/angular-resource.min.js');
    wp_enqueue_script('angularjs-route',  get_stylesheet_directory_uri() . '/js/angular-route.min.js');
    wp_enqueue_script('BSJS',  get_stylesheet_directory_uri() . '/js/bootstrap.min.js');
    wp_enqueue_script('UIBS',  get_stylesheet_directory_uri() . '/js/ui-bootstrap.min.js');
    wp_enqueue_script('main', get_stylesheet_directory_uri() . '/js/main.js');
    wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.js');
    wp_enqueue_script('GhsJS', get_stylesheet_directory_uri() . '/js/GhsJS.js', array( 'angularjs', 'angularjs-route', 'jq', 'main', 'app', 'BSJS', 'UIBS'), true);

    //localization of scripts
    wp_localize_script('GhsJS', 'myLocalized', array('partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'));
}

function ghs_head(){
    ?>

    <title><?php

        if(is_home()){
            echo ucfirst(get_bloginfo( 'name' ));
        } else {
            echo ucwords(wp_title( ' | ', false, right ) . get_bloginfo( 'name' ));
        }
        ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" type="image/x-icon" href="https://ghostszmusic.com/wp-content/uploads/2016/03/favicon.ico" />
    <base href="<?php echo site_url('/'); ?>">
    <script>
        var site = "<?php echo site_url('/'); ?>";
    </script>

    <?php if(is_page('login')){ ?>
        <meta name="google-signin-client_id" content="979177383237-je61denbtu2te7ilni37cj1sdcfqt67n.apps.googleusercontent.com">
    <?php } ?>

<?php
}

function ghs_theme_support(){

    add_theme_support( 'html5', array(
        'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', ) );

    add_theme_support('post-formats', array(
        'aside',
        'gallery',
        'image',
        'video',
        'audio'
    ));

    add_theme_support('post-thumbnails');

}

function blockusers_init() {
    if ( is_admin() && ! current_user_can( 'administrator' ) &&
        ! ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
        wp_redirect( home_url() );
        exit;
    }
}

//adding actions
add_action('wp_head', 'ghs_head');
add_action('after_setup_theme', 'ghs_theme_support');
add_action( 'wp_enqueue_scripts', 'ghs_scrs' );
add_action( 'init', 'blockusers_init' );

//adding filters
add_filter('show_admin_bar', '__return_false');