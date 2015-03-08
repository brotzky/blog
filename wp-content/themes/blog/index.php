<?php

	// get header
	get_header();

	// The Loop
	if(have_posts()) :
		// Execute while have posts. Do the posts
		while (have_posts()) : the_post(); ?>
          <div class="hero-image"></div>
		<!-- Main article posts -->
		<article>
              <div class="blog-content">
			<h2><a href='<?php the_permalink(); ?>'><?php the_title();?></a></h2>
                  <div class="post-date">Posted: <?php the_time('F j, Y'); ?></div>
			<?php the_content(); ?>
              </div>
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
