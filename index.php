<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>FameTv</title>

        <!-- Bootstrap Core CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <!--font awesome-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <!-- App CSS -->
        <link href="http://nz.lab/fametv-html/dist/main.css" rel="stylesheet">
        <noscript>
        <style>
            html{
                opacity: 1;
            }
        </style>
        </noscript>
        <script type="text/javascript">
            var site_path = '//' + window.location.host;
        </script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
        <div id="header">

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
                        <a class="navbar-brand page-scroll" href="/">
                            <img class="logo-img" alt="Fame Tv Logo" src="http://nz.lab/fametv-html/src/img/fametv-logo.png" >
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse navbar-ex1-collapse">
                        <ul class="nav navbar-nav">
                            <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                            <li class="hidden">
                                <a class="page-scroll" href="#home"></a>
                            </li>
                            <li>
                                <a class="page-scroll" href="/page/about">About</a>
                            </li>
                            <!--                        
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
        </div>

        <div id="app">
            <div class="page_holder" id="page_holder_1"></div>
            <div class="page_holder" id="page_holder_2"></div>

            <div id="loader"></div>
        </div>
        <!-- /#app -->

        <!-- app-->
        <script src="http://nz.lab/fametv-html/dist/modules.js"></script>
        <script src="http://nz.lab/fametv-html/dist/build.min.js"></script>

    </body>
</html>
