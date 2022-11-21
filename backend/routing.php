<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require "services/DB.php";

use services\DB;

require('controllers/PostsController.php');

//  Getting Current URL
$current_link = $_SERVER['REQUEST_URI'];

var_dump($current_link);
exit;

// Routes

$urls = [
        '/react_php_apis_project/backend/posts' => ['PostsController@getPostsFromDatabase']
];



?>