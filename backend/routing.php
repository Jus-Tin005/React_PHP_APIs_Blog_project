<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require "services/DB.php";

use services\DB;
use Api\Api;

require('controllers/PostsController.php');
require("Api.php");

//  Getting Current URL
$current_link = $_SERVER['REQUEST_URI'];

//  Handling query string
if(str_contains($current_link, '?')){
        $current_link = explode('?', $current_link)[0];
}

// var_dump($current_link[0]);
// exit;

// Routes

$urls = [
        '/react_php_apis_project/backend/posts' => ['PostsController@getPostsFromDatabase'],
        '/react_php_apis_project/backend/searchResult' => ['PostsController@getSearchResults'],
        '/react_php_apis_project/backend/getCurrentTopic' => ['PostsController@getCurrentTopic'],
];

//  Check if route available

$availableRoutes = array_keys($urls);

if(!in_array($current_link, $availableRoutes)){
        header('HTTP/1.0 404 Not found');
        exit;
}

Api::routing($current_link, $urls);



?>