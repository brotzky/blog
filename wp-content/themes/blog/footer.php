
		<!-- Footer -->
		<footer>
			<div id="sharedfooter">
				<div class="row clearfix">
					<div class="small-12 medium-5 offset-1 medium-uncentered small-centered columns clearfix footer-section">
						<p><?php bloginfo('name'); ?> - &copy; <?php echo date('Y')?></p>
					</div>
				</div>
		</div>

            <?php
              $args = array(
                  'theme_location' => 'footer'
                );
            ?>
            <nav class="fixed-nav">
              <?php wp_nav_menu($args); ?>
            </nav>
		</footer> <!-- /Footer -->

		</div> <!-- /Site Header -->

		<!-- Footer Hook -->
		<?php wp_footer(); ?>

	</body>
</html>
