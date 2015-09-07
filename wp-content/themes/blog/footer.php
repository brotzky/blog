            </div> 

		<footer>

						<p><?php bloginfo('name'); ?> - &copy; <?php echo date('Y')?></p>

		</footer> 


		<?php wp_footer(); ?>
		<script>document.addEventListener("DOMContentLoaded", function(event) {
		        var heroMessage = document.querySelectorAll('.blog-content');
		        heroMessage[0].className += " is-active";

		        console.log(heroMessage.length);


		        var i = 0 
		        var delayAmount = 30;
		        var divNum = heroMessage.length;
		        function f() {
		            
		            
		            if( i < divNum ){
		            	heroMessage[i].className += " is-active";
		                setTimeout( f, delayAmount );
		            }
		            i++;
		            delayAmount *= 1.05;
		        }
		        f();
		      });</script>


		<script>

		</script>

	</body>
</html>
