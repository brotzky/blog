<?php


	function blog_themes() {

		// importing style sheets
		wp_enqueue_style('style', get_template_directory_uri(). '/style.css');
		//wp_enqueue_style('foundation', get_template_directory_uri(). '/css/foundation.css');
            wp_enqueue_style('normalize', get_template_directory_uri(). '/css/normalize.css');
		// wp_enqueue_style('foundtain.min', get_template_directory_uri(). 'css/foundation.min.css');

		// Include ONLY if home page
		// if(is_page('home')) {
		// 	wp_enqueue_style('flexslider')
		// }

            // Live Reload
            if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
              wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
              wp_enqueue_script('livereload');
            }

            // jQuery Library
            wp_deregister_script( 'jquery' );
            wp_register_script( 'jquery', ( 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js' ), false, null, true );
            wp_enqueue_script( 'jquery' );

            // Local Javascript File
            wp_enqueue_script( 'javascript',  get_template_directory_uri(). '/js/javascript.js', array(), '1.0.0', true);

	}
	// executing function that grabs style sheet
	add_action('wp_enqueue_scripts', 'blog_themes');

       // Navigation Menus
      register_nav_menus(array(
          'primary' => __( 'Primary Menu'),
          'footer' => __('Footer Menu'),
        ))
?>