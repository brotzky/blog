<?php


function learningWordpress_blog() {

	// importing style sheet
	wp_enqueue_style('style', get_stylesheet_uri());

}

// executing function that grabs style sheet
add_action('wo_enqueue_scripts', 'learningWordpress_blog');

?>