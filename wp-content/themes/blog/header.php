<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <!-- UI Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title><?php wp_title(''); ?></title>
    <?php wp_head(); ?>
    <!-- Favicon -->
    <!-- link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/favicon.ico">
    For development purposes
    <link rel="shortcut icon" href="http://www.dennisbrotzky.me/favicon.ico?v=2" />
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff"> -->
    <!-- Font -->
    <link href='http://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'>
    <!-- Meta -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="language" content="en-us" />
    <meta name="google-site-verification" content="DKyz7VnkbOa5LINwu-cpRANpBCRSpo2B5cEIBMtpPeM" />
    <meta name="author" content="Dennis Brotzky" />
    <meta name="copyright" content="Copyright Dennis Brotzky 2015" />
    <meta name="description" content="Dennis Brotzky is a Web Designer / Front-End Developer with a focus on design and aesthetic. He is able
                                                                        to bring together the technicality of programming with the simplicity of aesthetics." />
    <!-- Facebook OG Meta -->
    <meta property="og:title" content="Dennis Brotzky" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://dennisbrotzky.co/blog" />
    <meta property="og:image" content="http://dennisbrotzky.me/img/dennis_introduction.png" />
    <meta property="og:description" content="Dennis Brotzky is a Web Designer / Front-End Developer with a focus on design and aesthetic. He is able
                                                                        to bring together the technicality of programming with the simplicity of aesthetics." />
    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-59445007-2', 'auto');
      ga('send', 'pageview');

    </script>

  </head>
  <body <?php body_class(); ?>>
    <!-- Site Container -->
    <div class="container">

    <?php
      $args = array(
          'theme_location' => 'primary'
        );
    ?>
    <!-- Site Navigation -->
    <nav class="fixed-nav">
      <!-- Site Header -->
    <header>
        <!-- change info in the settings -->
        <h1 class="blog-home"><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
    </header><!-- /Site Header -->
      <?php wp_nav_menu($args); ?>
    </nav>