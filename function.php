<?php
/**
 * Created by IntelliJ IDEA.
 * User: dev
 * Date: 2/3/17
 * Time: 5:47 PM
 */

function ghs_scrs(){

    //styles
    wp_enqueue_script('style', get_stylesheet_directory_uri() . 'style.css');

    //scripts
    wp_register_script('AJS', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js' , '', '', true );
    wp_register_script('AJSRoute', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js' , '', '', true );
    wp_enqueue_script('GHSJS', get_stylesheet_directory_uri() . '/js/GhsJS.js', array('AJS', 'AJSRoute'), true);

}

add_action('wp_enqueue_scripts', 'ghs_scrs');