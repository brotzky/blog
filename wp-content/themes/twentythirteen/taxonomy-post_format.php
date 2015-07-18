<?php
/**
 * The template for displaying Post Format pages
 *
 * Used to display archive-type pages for posts with a post format.
 * If you'd like to further customize these Post Format views, you may create a
 * new template file for each specific one.
 *
<<<<<<< HEAD
 * @link https://codex.wordpress.org/Template_Hierarchy
=======
 * @link http://codex.wordpress.org/Template_Hierarchy
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

		<?php if ( have_posts() ) : ?>
			<header class="archive-header">
<<<<<<< HEAD
				<h1 class="archive-title"><?php printf( __( '%s Archives', 'twentythirteen' ), '<span>' . esc_html( get_post_format_string( get_post_format() ) ) . '</span>' ); ?></h1>
=======
				<h1 class="archive-title"><?php printf( __( '%s Archives', 'twentythirteen' ), '<span>' . get_post_format_string( get_post_format() ) . '</span>' ); ?></h1>
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
			</header><!-- .archive-header -->

			<?php /* The loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', get_post_format() ); ?>
			<?php endwhile; ?>

			<?php twentythirteen_paging_nav(); ?>

		<?php else : ?>
			<?php get_template_part( 'content', 'none' ); ?>
		<?php endif; ?>

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<<<<<<< HEAD
<?php get_footer(); ?>
=======
<?php get_footer(); ?>
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
