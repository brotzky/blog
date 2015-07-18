/**
 * Twenty Fourteen keyboard support for image navigation.
 */
( function( $ ) {
	$( document ).on( 'keydown.twentyfourteen', function( e ) {
		var url = false;

		// Left arrow key code.
		if ( e.which === 37 ) {
			url = $( '.previous-image a' ).attr( 'href' );

		// Right arrow key code.
		} else if ( e.which === 39 ) {
			url = $( '.entry-attachment a' ).attr( 'href' );
		}

<<<<<<< HEAD
		if ( url && ( ! $( 'textarea, input' ).is( ':focus' ) ) ) {
=======
		if ( url && ( !$( 'textarea, input' ).is( ':focus' ) ) ) {
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
			window.location = url;
		}
	} );
} )( jQuery );