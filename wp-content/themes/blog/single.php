<?php get_header(); ?>

  <main role="main">
  <!-- section -->
  <section>

  <?php if (have_posts()): while (have_posts()) : the_post(); ?>
    <div class="hero-image hero-image-one"></div>
      <div class="blog-content animation-start"></div>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <div class="blog-content">
      <div class="blog-media">
          <?php the_post_thumbnail(); // Fullsize image for the single post ?>
      </div>
      <div class="blog-text">
      <?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">

        </a>
      <?php endif; ?>

      <h1 class="post-title">
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
      </h1>

      <span class="post-date"><?php the_time('F j, Y'); ?> <?php the_time('g:i a'); ?></span>
      

      <?php the_content(); // Dynamic Content ?>
        </div>
      </div>
    </article>

    <div class="blog-home-container">
      <span class="blog-home-button"><a href="<?php echo esc_url( home_url( '/' ) );?>"> Blog Home</a></span>
    </div>

  <?php endwhile; ?>

  <?php else: ?>

    <article>

      <h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

    </article>

  <?php endif; ?>

  </section>
  </main>

  
<?php get_footer(); ?>
