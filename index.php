<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require "./backend/services/DB.php";
use services\DB;

require "./backend/controllers/PostsController.php";
use Backend\Controllers\PostsController;

// var_dump(new DB());
(new PostsController)->getPosts();
?>