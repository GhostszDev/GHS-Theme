<?php
/**
 * Created by IntelliJ IDEA.
 * User: dev
 * Date: 2/3/17
 * Time: 5:47 PM
 */

function wpdocs_theme_name_scripts() {

    //styles
    wp_enqueue_style( 'style-name', get_stylesheet_uri() );

    //scripts
    wp_enqueue_script('angularjs', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js');
    wp_enqueue_script('angularjs-resource', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-resource.min.js');
    wp_enqueue_script('angularjs-route', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js');
    wp_enqueue_script('scripts', get_stylesheet_directory_uri() . '/js/GhsJS.js', array( 'angularjs', 'angularjs-route'), true);
}

add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );