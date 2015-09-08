<?php
	get_header();
?>
<div class="blog-content-container">
    <div class="blog-content animation-start"></div>
<?php
	// The Loop

	if(have_posts()) :
		// Execute while have posts. Do the posts
		while (have_posts()) : the_post(); ?>
		<article>

                <div class="blog-content" onclick="location.href='<?php the_permalink();?>';">
  			       <div class="blog-wrapper">
                       <h2><a href='<?php the_permalink(); ?>'><?php the_title();?></a></h2>
                        <div class="post-date"><?php the_time('F j, Y'); ?></div>
                    </div>
                </div>
		</article>

		<?php endwhile;
		 else :
            endif;
             ?>
    </div>

    <script>
    document.addEventListener("DOMContentLoaded",function(){function e(){o>n&&(setTimeout(e,c),t[n].className+=" is-active"),c*=1.069,n++}var t=document.querySelectorAll(".blog-content"),n=0,o=t.length,c=28;e()});
    </script>
 <?php
	get_footer ();

?>
