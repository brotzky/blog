<?php


	function blog_themes() {

		// importing style sheets
		wp_enqueue_style('style', get_template_directory_uri(). '/style.css');
		wp_enqueue_style('foundation', get_template_directory_uri(). 'css/foundation.css');
		// wp_enqueue_style('foundtain.min', get_template_directory_uri(). 'css/foundation.min.css');

		// Include ONLY if home page
		// if(is_page('home')) {
		// 	wp_enqueue_style('flexslider')
		// }

	}
	// executing function that grabs style sheet
	add_action('wp_enqueue_scripts', 'blog_themes');

  // Navigation Menus
    register_nav_menus(array(
        'primary' => __( 'Primary Menu'),
        'footer' => __('Footer Menu'),
      ))
?>