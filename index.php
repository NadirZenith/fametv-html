<?php
include 'nzdebug.php';
include 'src/config.php';
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Fame Tv</title>

        <!-- Bootstrap Core CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <!--font awesome-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <!-- App CSS -->
        <link href="dist/main.css" rel="stylesheet">
        <noscript>
        <style>
            html{
                opacity: 1;
            }
        </style>
        </noscript>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <!-- The #page-top ID is part of the scrolling feature - the data-spy and data-target are part of the built-in Bootstrap scrollspy function -->
    <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <!--<div class="container-fluid">-->
            <div class="container">
                <div class="navbar-header page-scroll">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand page-scroll" href="#home">
                        <img class="logo-img" alt="Fame Tv Logo" src="src/img/fametv-logo.png" >
                    </a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                        <li class="hidden">
                            <a class="page-scroll" href="#home"></a>
                        </li>
<!--                        
                        <li>
                            <a class="page-scroll" href="#list">List</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#contact">Contact</a>
                        </li>
-->
                    </ul>
                </div>
                <div class="socials pull-right">
                    <ul>
                        <li>
                            <a href="" target="_blank">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                                <i class="fa fa-youtube"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>

        <!-- 1 Home Section -->
        <section id="home" class="full-section primary">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-lg-offset-1 col-lg-10" >
                        <div class="main-video">
                            <video class="video-js vjs-default-skin"
                                   controls autoplay preload="auto" 
                                   >
                                <source src="src/video/video<?php echo rand(1, 4) ?>.mp4" type='video/mp4'>
                                <p class="vjs-no-js">
                                    To view this video please enable JavaScript, and consider upgrading to a web browser that
                                    <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                </p>

                            </video>
                        </div>
                        <h1>FAME Porto - brincadeiras de TV e Moda na aula de José Figueiras</h1>

                    </div>
                </div>
            </div>
        </section>
        <!-- 1 Home Section -->
        <section id="list" class="full-section secondary">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1>List</h1>

                        <div class="row">
                            <?php include 'src/list.php' ?>
                            <?php include 'src/list.php' ?>
                            <?php include 'src/list.php' ?>
                            <?php include 'src/list.php' ?>
                            <?php include 'src/list.php' ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- app-->
        <script src="dist/modules.js"></script>
        <script src="dist/app.js"></script>
        <?php
        include 'src/switch_branch.php';
        ?>
        <script>
            
        </script>
    </body>
</html>
