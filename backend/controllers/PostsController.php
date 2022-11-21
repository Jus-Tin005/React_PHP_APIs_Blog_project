<?php

namespace Backend\Controllers;

use Services\DB;

class PostsController{
        public $conn = null;

        public function __construct(){
                // Create Connection
                $this->conn = (new DB())->database();
        }

        // Getting Posts From Third Party API
        public function getPosts(){
                try{
                        // Getting Data
                        $url = "https://jsonplaceholder.typicode.com/posts";
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
                        curl_setopt($ch, CURLOPT_HEADER, 0);
                        curl_setopt($ch, CURLOPT_ENCODING, 0);
                        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
                        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
                        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
                        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));


                        //  Getting Images
                        $url = "https://jsonplaceholder.typicode.com/photos";
                        $chImg = curl_init();
                        curl_setopt($chImg, CURLOPT_AUTOREFERER, TRUE);
                        curl_setopt($chImg, CURLOPT_HEADER, 0);
                        curl_setopt($chImg, CURLOPT_ENCODING, 0);
                        curl_setopt($chImg, CURLOPT_MAXREDIRS, 10);
                        curl_setopt($chImg, CURLOPT_TIMEOUT, 30);
                        curl_setopt($chImg, CURLOPT_CUSTOMREQUEST, "GET");
                        curl_setopt($chImg, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($chImg, CURLOPT_URL, $url);
                        curl_setopt($chImg, CURLOPT_FOLLOWLOCATION, TRUE);
                        curl_setopt($chImg, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

                        $responData = json_decode(curl_exec($ch), true);
                        $responImages = json_decode(curl_exec($chImg), true);
                        $newArray = [];


                        // Combining Data

                        // echo "<pre>";
                        // var_dump($responData);
                        // var_dump( $responImages);
                        // exit;

                        foreach($responData as $resData){
                                if(isset($responImages[$resData['id']])){
                                        $resData['image'] = $responImages[$resData['id']] ['url'];
                                }
                                $newArray[] = $resData;
                        }

                        /* echo "<pre>";
                        var_dump($newArray);
                        exit; */

                        $this->savePostsToDatabase($newArray);


                }catch(\Exception $e){
                        var_dump($e->getMessage());
                        exit;
                }
        }


        // Save Posts in Database from API
        public function savePostsToDatabase($posts = null){
                // Insert datas into database
                foreach($posts as $post){
                        // var_dump($post);

                        $sql = "INSERT INTO posts(`user_id`, `title`, `content`, `image`)
                        VALUES(
                                ` " . $post['userId'] .  " `,
                                ` " . $post['title'] . " `,
                                ` " . $post['body'] . " `,
                                ` " .$post['image'] . " ` )
                                         ";

                                if(mysqli_query($this->conn, $sql)){
                                        echo "New record created successfully";
                                }else{
                                        echo "Error:" . $sql . "<br>" . mysqli_error($this->conn);
                                }

                }

                mysqli_close($this->conn);
        }

}

?>