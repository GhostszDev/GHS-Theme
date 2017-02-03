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

}

add_action('wp_enqueue_scripts', 'ghs_scrs');