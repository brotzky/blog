/* global tinymce */
tinymce.PluginManager.add( 'wplink', function( editor ) {
<<<<<<< HEAD
	editor.addCommand( 'WP_Link', function() {
		window.wpLink && window.wpLink.open( editor.id );
	});

	// WP default shortcut
	editor.addShortcut( 'Alt+Shift+A', '', 'WP_Link' );
	// The "de-facto standard" shortcut, see #27305
	editor.addShortcut( 'Meta+K', '', 'WP_Link' );
=======
	var linkButton;
	
	// Register a command so that it can be invoked by using tinyMCE.activeEditor.execCommand( 'WP_Link' );
	editor.addCommand( 'WP_Link', function() {
		if ( ( ! linkButton || ! linkButton.disabled() ) && typeof window.wpLink !== 'undefined' ) {
			window.wpLink.open( editor.id );
		}
	});

	// WP default shortcut
	editor.addShortcut( 'alt+shift+a', '', 'WP_Link' );
	// The "de-facto standard" shortcut, see #27305
	editor.addShortcut( 'ctrl+k', '', 'WP_Link' );

	function setState( button, node ) {
		var parent = editor.dom.getParent( node, 'a' ),
			getView = editor.plugins.wpview ? editor.plugins.wpview.getView : function() { return false; };

		button.disabled( ( editor.selection.isCollapsed() && ! parent ) || ( parent && ! parent.href ) || getView( node ) );
		button.active( parent && parent.href );
	}
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135

	editor.addButton( 'link', {
		icon: 'link',
		tooltip: 'Insert/edit link',
<<<<<<< HEAD
		cmd: 'WP_Link',
		stateSelector: 'a[href]'
=======
		shortcut: 'Alt+Shift+A',
		cmd: 'WP_Link',

		onPostRender: function() {
			linkButton = this;

			editor.on( 'nodechange', function( event ) {
				setState( linkButton, event.element );
			});
		}
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
	});

	editor.addButton( 'unlink', {
		icon: 'unlink',
		tooltip: 'Remove link',
<<<<<<< HEAD
		cmd: 'unlink'
=======
		cmd: 'unlink',

		onPostRender: function() {
			var unlinkButton = this;

			editor.on( 'nodechange', function( event ) {
				setState( unlinkButton, event.element );
			});
		}
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
	});

	editor.addMenuItem( 'link', {
		icon: 'link',
<<<<<<< HEAD
		text: 'Insert/edit link',
=======
		text: 'Insert link',
		shortcut: 'Alt+Shift+A',
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
		cmd: 'WP_Link',
		stateSelector: 'a[href]',
		context: 'insert',
		prependToContext: true
	});
<<<<<<< HEAD

	editor.on( 'pastepreprocess', function( event ) {
		var pastedStr = event.content;

		if ( ! editor.selection.isCollapsed() ) {
			pastedStr = pastedStr.replace( /<[^>]+>/g, '' );
			pastedStr = tinymce.trim( pastedStr );

			if ( /^(?:https?:)?\/\/\S+$/i.test( pastedStr ) ) {
				editor.execCommand( 'mceInsertLink', false, {
					href: editor.dom.decode( pastedStr )
				} );

				event.preventDefault();
			}
		}
	} );
=======
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
});
