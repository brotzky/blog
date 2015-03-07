<?php

	// get header
	get_header();

	// The Loop
	if(have_posts()) :
		// Execute while have posts. Do the posts
		while (have_posts()) : the_post(); ?>

		<!-- Main article posts -->
		<article>
			<h2><a href='<?php the_permalink(); ?>'><?php the_title();?></a></h2>
                  <div>Posted: <?php the_time('F j, Y'); ?></div>
			<?php the_content(); ?>
		</article>
		<!-- / Main article posts -->

		<?php endwhile;
		// If not posts: 'No Content Found'
		 else :
		// 	<?php echo '<p>No Content Found</p>';
            endif;
             ?>

 <?php
	// get footer
	get_footer ();

?>
