<?php
/**
 * Created by IntelliJ IDEA.
 * User: dev
 * Date: 2/3/17
 * Time: 5:47 PM
 */

function wpdocs_theme_name_scripts() {

    //styles
    wp_enqueue_style( 'bootstrap', get_stylesheet_directory_uri() . '/css/bootstrap.min.css');
    wp_enqueue_style( 'icons', get_stylesheet_directory_uri() . '/css/icons.css');
    wp_enqueue_style( 'main', get_stylesheet_directory_uri() . '/css/main.css');
    wp_enqueue_style( 'responsive', get_stylesheet_directory_uri() . '/css/responsive.css');
    wp_enqueue_style( 'style', get_stylesheet_uri());

    //scripts
    wp_enqueue_script('angularjs', get_stylesheet_directory_uri() . '/js/angular.min.js');
    wp_enqueue_script('angularjs-resource', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-resource.min.js');
    wp_enqueue_script('angularjs-route', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js');
    wp_enqueue_script('jq', get_stylesheet_directory_uri() . '/js/jquery-2.1.3.js');
    wp_enqueue_script('main', get_stylesheet_directory_uri() . '/js/main.js');
    wp_enqueue_script('app', get_stylesheet_directory_uri() . '/js/app.js');
    wp_enqueue_script('GhsJS', get_stylesheet_directory_uri() . '/js/GhsJS.js', array( 'angularjs', 'angularjs-route', 'jq', 'main', 'app'), true);

    //localization of scripts
    wp_localize_script('GhsJS', 'myLocalized', array('partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'));
}

//adding actions
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );