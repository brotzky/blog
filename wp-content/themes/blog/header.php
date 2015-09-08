<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(''); ?></title>
    <?php wp_head(); ?>
    <link href='http://fonts.googleapis.com/css?family=Halant' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="language" content="en-us" />
    <meta name="google-site-verification" content="DKyz7VnkbOa5LINwu-cpRANpBCRSpo2B5cEIBMtpPeM" />
    <meta name="author" content="Dennis Brotzky" />
    <meta name="copyright" content="Copyright Dennis Brotzky 2015" />
    <meta name="description" content="Dennis Brotzky is a Front End Developer with a focus on clean code, beautiful interfaces, high converting pages, and optimized performance." />
    <meta property="og:title" content="Dennis Brotzky" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://dennisbrotzky.co/blog" />
    <meta property="og:image" content="http://dennisbrotzky.me/img/dennis_introduction.png" />
    <meta property="og:description" content="Dennis Brotzky is a Front End Developer with a focus on clean code, beautiful interfaces, high converting pages, and optimized performance." />
  </head>
  <body <?php body_class(); ?>>
    <div class="container">

    <?php
      $args = array(
          'theme_location' => 'primary'
        );
    ?>
    <!-- Site Navigation -->
    <nav class="fixed-nav">
      <!-- Site Header -->
      <?php wp_nav_menu($args); ?>
    </nav>