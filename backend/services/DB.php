<?php

        namespace services;
        use mysqli;

        class DB {
                public $db_host = "localhost:3330";
                public $db_user = "root";
                public $db_password = "khunTun1997";
                public $db_database = "react_php";
                public $conn;


                public function database(){

                        // Making Connection
                        $conn = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_database);  // notice here cuz of php version must not include $ in db_host,etc.

                        // Checking Connection
                        if($conn->connect_error){
                                die("Connection failed" . $conn->connect_error);
                        }

                        return $this->conn;
                }
        }


        /*
        ! Note About new mysqli

        */

                        /**************************************
                 Open Database Connection Function.
                ***************************************/
                /* Database Connection Settings */
                /*    $_SESSION['servername']     = "localhost";
                $_SESSION['mysql_username'] = "abc123";
                $_SESSION['mysql_password'] = "mypass";
                $_SESSION['dbname']         = "dbname";


                function db_conn() {

                        $conn = new mysqli($_SESSION['servername'], $_SESSION['mysql_username'], $_SESSION['mysql_password'], $_SESSION['dbname']);

                        // Check connection
                        if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);

                        // Test if connection succeeded
                        if(mysqli_connect_errno()) {
                        die("Database connection failed: " .
                                mysqli_connect_error() .
                                " (" . mysqli_connect_errno() . ")"
                        );
                        }
                } */





?>