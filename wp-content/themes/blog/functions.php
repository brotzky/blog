<?php


	function blog_themes() {

		// importing style sheets
		wp_enqueue_style('style', get_template_directory_uri(). '/style.css');
		wp_enqueue_style('foundation', get_template_directory_uri(). 'css/foundation.css');
            wp_enqueue_style('normalize', get_template_directory_uri(). 'css/normalize.css');
		// wp_enqueue_style('foundtain.min', get_template_directory_uri(). 'css/foundation.min.css');

		// Include ONLY if home page
		// if(is_page('home')) {
		// 	wp_enqueue_style('flexslider')
		// }
            if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
              wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
              wp_enqueue_script('livereload');
            }

	}
	// executing function that grabs style sheet
	add_action('wp_enqueue_scripts', 'blog_themes');

  // Navigation Menus
    register_nav_menus(array(
        'primary' => __( 'Primary Menu'),
        'footer' => __('Footer Menu'),
      ))
?>