<?php

	// get header
	get_header();
?>
<div class="introduction-container">
    <div>
        <span class="introduction-hi">Hi,
            <div class="rotating-hi_1"></div>
            <div class="rotating-hi_2"></div>
            <div class="rotating-hi_3"></div>
            <div class="rotating-hi_4"></div>
            <div class="rotating-hi_5"></div>
            <div class="rotating-hi_6"></div>
            <div class="rotating-hi_7"></div>
            <div class="rotating-hi_8"></div>
        </span>
        <span class="introduction-star">*</span>
        <span class="introduction-disclaimer">The appearance of this blog is always changing. I like to exerpiment with new styles and techniques when I have the time.</span>
    </div>
    <div class="introduction-blurb">
        <p>This is my blog. The core idea is to document things I have learned or am interested in. </p>
    </div>
</div>
<div class="blog-content-container">
<?php
	// The Loop

	if(have_posts()) :
		// Execute while have posts. Do the posts
		while (have_posts()) : the_post(); ?>
		<!-- Main article posts -->
		<article>

                <div class="blog-content" onclick="location.href='<?php the_permalink();?>';" style="cursor: pointer;">
  			<h2><a href='<?php the_permalink(); ?>'><?php the_title();?></a></h2>
                    <div class="post-date"><?php the_time('F j, Y'); ?></div>
                </div>
		</article>
		<!-- / Main article posts -->

		<?php endwhile;
		// If not posts: 'No Content Found'
		 else :
		// 	<?php echo '<p>No Content Found</p>';
            endif;
             ?>
    </div>
 <?php
	// get footer
	get_footer ();

?>
