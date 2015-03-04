<?php 

get_header(); 

if(have_posts()) :
	while (have_posts()) : the_post(); ?>

	<article>
		<h2><a href='<?php the_permalink(); ?>'><?php the_title();?></a></h2>
		<?php the_content(); ?>
	</article>
	<?php endwhile;

	else :
		echo '<p>No Content Found</p>';

get_footer (); 


?>