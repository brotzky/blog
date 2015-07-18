/* global tinymce */
<<<<<<< HEAD

window.wp = window.wp || {};

/*
 * The TinyMCE view API.
 *
 * Note: this API is "experimental" meaning that it will probably change
 * in the next few releases based on feedback from 3.9.0.
 * If you decide to use it, please follow the development closely.
 *
 * Diagram
 *
 * |- registered view constructor (type)
 * |  |- view instance (unique text)
 * |  |  |- editor 1
 * |  |  |  |- view node
 * |  |  |  |- view node
 * |  |  |  |- ...
 * |  |  |- editor 2
 * |  |  |  |- ...
 * |  |- view instance
 * |  |  |- ...
 * |- registered view
 * |  |- ...
 */
( function( window, wp, $ ) {
	'use strict';

	var views = {},
		instances = {};

	wp.mce = wp.mce || {};

	/**
=======
/**
 * Note: this API is "experimental" meaning that it will probably change
 * in the next few releases based on feedback from 3.9.0.
 * If you decide to use it, please follow the development closely.
 */

// Ensure the global `wp` object exists.
window.wp = window.wp || {};

( function( $ ) {
	'use strict';

	var views = {},
		instances = {},
		media = wp.media,
		mediaWindows = [],
		windowIdx = 0,
		waitInterval = 50,
		viewOptions = ['encodedText'];

	// Create the `wp.mce` object if necessary.
	wp.mce = wp.mce || {};

	/**
	 * wp.mce.View
	 *
	 * A Backbone-like View constructor intended for use when rendering a TinyMCE View. The main difference is
	 * that the TinyMCE View is not tied to a particular DOM node.
	 *
	 * @param {Object} [options={}]
	 */
	wp.mce.View = function( options ) {
		options = options || {};
		this.type = options.type;
		_.extend( this, _.pick( options, viewOptions ) );
		this.initialize.apply( this, arguments );
	};

	_.extend( wp.mce.View.prototype, {
		initialize: function() {},
		getHtml: function() {
			return '';
		},
		loadingPlaceholder: function() {
			return '' +
				'<div class="loading-placeholder">' +
					'<div class="dashicons dashicons-admin-media"></div>' +
					'<div class="wpview-loading"><ins></ins></div>' +
				'</div>';
		},
		render: function( force ) {
			if ( force || ! this.rendered() ) {
				this.unbind();

				this.setContent(
					'<p class="wpview-selection-before">\u00a0</p>' +
					'<div class="wpview-body" contenteditable="false">' +
						'<div class="toolbar mce-arrow-down">' +
							( _.isFunction( views[ this.type ].edit ) ? '<div class="dashicons dashicons-edit edit"></div>' : '' ) +
							'<div class="dashicons dashicons-no remove"></div>' +
						'</div>' +
						'<div class="wpview-content wpview-type-' + this.type + '">' +
							( this.getHtml() || this.loadingPlaceholder() ) +
						'</div>' +
						( this.overlay ? '<div class="wpview-overlay"></div>' : '' ) +
					'</div>' +
					'<p class="wpview-selection-after">\u00a0</p>',
					'wrap'
				);

				$( this ).trigger( 'ready' );

				this.rendered( true );
			}
		},
		unbind: function() {},
		getEditors: function( callback ) {
			var editors = [];

			_.each( tinymce.editors, function( editor ) {
				if ( editor.plugins.wpview ) {
					if ( callback ) {
						callback( editor );
					}

					editors.push( editor );
				}
			}, this );

			return editors;
		},
		getNodes: function( callback ) {
			var nodes = [],
				self = this;

			this.getEditors( function( editor ) {
				$( editor.getBody() )
				.find( '[data-wpview-text="' + self.encodedText + '"]' )
				.each( function ( i, node ) {
					if ( callback ) {
						callback( editor, node, $( node ).find( '.wpview-content' ).get( 0 ) );
					}

					nodes.push( node );
				} );
			} );

			return nodes;
		},
		setContent: function( html, option ) {
			this.getNodes( function ( editor, node, content ) {
				var el = ( option === 'wrap' || option === 'replace' ) ? node : content,
					insert = html;

				if ( _.isString( insert ) ) {
					insert = editor.dom.createFragment( insert );
				}

				if ( option === 'replace' ) {
					editor.dom.replace( insert, el );
				} else {
					el.innerHTML = '';
					el.appendChild( insert );
				}
			} );
		},
		/* jshint scripturl: true */
		setIframes: function ( head, body ) {
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
				importStyles = this.type === 'video' || this.type === 'audio' || this.type === 'playlist';

			if ( head || body.indexOf( '<script' ) !== -1 ) {
				this.getNodes( function ( editor, node, content ) {
					var dom = editor.dom,
						styles = '',
						bodyClasses = editor.getBody().className || '',
						iframe, iframeDoc, i, resize;

					content.innerHTML = '';
					head = head || '';

					if ( importStyles ) {
						if ( ! wp.mce.views.sandboxStyles ) {
							tinymce.each( dom.$( 'link[rel="stylesheet"]', editor.getDoc().head ), function( link ) {
								if ( link.href && link.href.indexOf( 'skins/lightgray/content.min.css' ) === -1 &&
									link.href.indexOf( 'skins/wordpress/wp-content.css' ) === -1 ) {

									styles += dom.getOuterHTML( link ) + '\n';
								}
							});

							wp.mce.views.sandboxStyles = styles;
						} else {
							styles = wp.mce.views.sandboxStyles;
						}
					}

					// Seems Firefox needs a bit of time to insert/set the view nodes, or the iframe will fail
					// especially when switching Text => Visual.
					setTimeout( function() {
						iframe = dom.add( content, 'iframe', {
							src: tinymce.Env.ie ? 'javascript:""' : '',
							frameBorder: '0',
							allowTransparency: 'true',
							scrolling: 'no',
							'class': 'wpview-sandbox',
							style: {
								width: '100%',
								display: 'block'
							}
						} );

						iframeDoc = iframe.contentWindow.document;

						iframeDoc.open();
						iframeDoc.write(
							'<!DOCTYPE html>' +
							'<html>' +
								'<head>' +
									'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
									head +
									styles +
									'<style>' +
										'html {' +
											'background: transparent;' +
											'padding: 0;' +
											'margin: 0;' +
										'}' +
										'body#wpview-iframe-sandbox {' +
											'background: transparent;' +
											'padding: 1px 0 !important;' +
											'margin: -1px 0 0 !important;' +
										'}' +
										'body#wpview-iframe-sandbox:before,' +
										'body#wpview-iframe-sandbox:after {' +
											'display: none;' +
											'content: "";' +
										'}' +
									'</style>' +
								'</head>' +
								'<body id="wpview-iframe-sandbox" class="' + bodyClasses + '">' +
									body +
								'</body>' +
							'</html>'
						);
						iframeDoc.close();

						resize = function() {
							// Make sure the iframe still exists.
							iframe.contentWindow && $( iframe ).height( $( iframeDoc.body ).height() );
						};

						if ( MutationObserver ) {
							new MutationObserver( _.debounce( function() {
								resize();
							}, 100 ) )
							.observe( iframeDoc.body, {
								attributes: true,
								childList: true,
								subtree: true
							} );
						} else {
							for ( i = 1; i < 6; i++ ) {
								setTimeout( resize, i * 700 );
							}
						}

						if ( importStyles ) {
							editor.on( 'wp-body-class-change', function() {
								iframeDoc.body.className = editor.getBody().className;
							});
						}
					}, waitInterval );
				});
			} else {
				this.setContent( body );
			}
		},
		setError: function( message, dashicon ) {
			this.setContent(
				'<div class="wpview-error">' +
					'<div class="dashicons dashicons-' + ( dashicon ? dashicon : 'no' ) + '"></div>' +
					'<p>' + message + '</p>' +
				'</div>'
			);
		},
		rendered: function( value ) {
			var notRendered;

			this.getNodes( function( editor, node ) {
				if ( value != null ) {
					$( node ).data( 'rendered', value === true );
				} else {
					notRendered = notRendered || ! $( node ).data( 'rendered' );
				}
			} );

			return ! notRendered;
		}
	} );

	// take advantage of the Backbone extend method
	wp.mce.View.extend = Backbone.View.extend;

	/**
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
	 * wp.mce.views
	 *
	 * A set of utilities that simplifies adding custom UI within a TinyMCE editor.
	 * At its core, it serves as a series of converters, transforming text to a
	 * custom UI, and back again.
	 */
	wp.mce.views = {

		/**
<<<<<<< HEAD
		 * Registers a new view type.
		 *
		 * @param {String} type   The view type.
		 * @param {Object} extend An object to extend wp.mce.View.prototype with.
		 */
		register: function( type, extend ) {
			views[ type ] = wp.mce.View.extend( _.extend( extend, { type: type } ) );
		},

		/**
		 * Unregisters a view type.
		 *
		 * @param {String} type The view type.
		 */
		unregister: function( type ) {
			delete views[ type ];
		},

		/**
		 * Returns the settings of a view type.
		 *
		 * @param {String} type The view type.
		 *
		 * @return {Function} The view constructor.
		 */
		get: function( type ) {
			return views[ type ];
		},

		/**
		 * Unbinds all view nodes.
		 * Runs before removing all view nodes from the DOM.
=======
		 * wp.mce.views.register( type, view )
		 *
		 * Registers a new TinyMCE view.
		 *
		 * @param type
		 * @param constructor
		 *
		 */
		register: function( type, constructor ) {
			var defaultConstructor = {
					type: type,
					View: {},
					toView: function( content ) {
						var match = wp.shortcode.next( this.type, content );

						if ( ! match ) {
							return;
						}

						return {
							index: match.index,
							content: match.content,
							options: {
								shortcode: match.shortcode
							}
						};
					}
				};

			constructor = _.defaults( constructor, defaultConstructor );
			constructor.View = wp.mce.View.extend( constructor.View );

			views[ type ] = constructor;
		},

		/**
		 * wp.mce.views.get( id )
		 *
		 * Returns a TinyMCE view constructor.
		 *
		 * @param type
		 */
		get: function( type ) {
			return views[ type ];
		},

		/**
		 * wp.mce.views.unregister( type )
		 *
		 * Unregisters a TinyMCE view.
		 *
		 * @param type
		 */
		unregister: function( type ) {
			delete views[ type ];
		},

		/**
		 * wp.mce.views.unbind( editor )
		 *
		 * The editor DOM is being rebuilt, run cleanup.
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
		 */
		unbind: function() {
			_.each( instances, function( instance ) {
				instance.unbind();
			} );
		},

		/**
<<<<<<< HEAD
		 * Scans a given string for each view's pattern,
		 * replacing any matches with markers,
		 * and creates a new instance for every match.
		 *
		 * @param {String} content The string to scan.
		 *
		 * @return {String} The string with markers.
		 */
		setMarkers: function( content ) {
			var pieces = [ { content: content } ],
				self = this,
				instance,
				current;

			_.each( views, function( view, type ) {
=======
		 * toViews( content )
		 * Scans a `content` string for each view's pattern, replacing any
		 * matches with wrapper elements, and creates a new instance for
		 * every match, which triggers the related data to be fetched.
		 *
		 * @param content
		 */
		toViews: function( content ) {
			var pieces = [ { content: content } ],
				current;

			_.each( views, function( view, viewType ) {
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
				current = pieces.slice();
				pieces  = [];

				_.each( current, function( piece ) {
					var remaining = piece.content,
						result;

					// Ignore processed pieces, but retain their location.
					if ( piece.processed ) {
						pieces.push( piece );
						return;
					}

					// Iterate through the string progressively matching views
					// and slicing the string as we go.
<<<<<<< HEAD
					while ( remaining && ( result = view.prototype.match( remaining ) ) ) {
						// Any text before the match becomes an unprocessed piece.
						if ( result.index ) {
							pieces.push( { content: remaining.substring( 0, result.index ) } );
						}

						instance = self.createInstance( type, result.content, result.options );

						// Add the processed piece for the match.
						pieces.push( {
							content: '<p data-wpview-marker="' + instance.encodedText + '">' + instance.text + '</p>',
							processed: true
						} );
=======
					while ( remaining && (result = view.toView( remaining )) ) {
						// Any text before the match becomes an unprocessed piece.
						if ( result.index ) {
							pieces.push({ content: remaining.substring( 0, result.index ) });
						}

						// Add the processed piece for the match.
						pieces.push({
							content: wp.mce.views.toView( viewType, result.content, result.options ),
							processed: true
						});
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135

						// Update the remaining content.
						remaining = remaining.slice( result.index + result.content.length );
					}

<<<<<<< HEAD
					// There are no additional matches.
					// If any content remains, add it as an unprocessed piece.
					if ( remaining ) {
						pieces.push( { content: remaining } );
					}
				} );
			} );

			return _.pluck( pieces, 'content' ).join( '' );
		},

		/**
		 * Create a view instance.
		 *
		 * @param {String} type    The view type.
		 * @param {String} text    The textual representation of the view.
		 * @param {Object} options Options.
		 *
		 * @return {wp.mce.View} The view instance.
		 */
		createInstance: function( type, text, options ) {
			var View = this.get( type ),
				encodedText,
				instance;

			text = tinymce.DOM.decode( text ),
			encodedText = encodeURIComponent( text ),
			instance = this.getInstance( encodedText );

			if ( instance ) {
				return instance;
			}

			options = _.extend( options || {}, {
				text: text,
				encodedText: encodedText
			} );

			return instances[ encodedText ] = new View( options );
		},

		/**
		 * Get a view instance.
		 *
		 * @param {(String|HTMLElement)} object The textual representation of the view or the view node.
		 *
		 * @return {wp.mce.View} The view instance or undefined.
		 */
		getInstance: function( object ) {
			if ( typeof object === 'string' ) {
				return instances[ encodeURIComponent( object ) ];
			}

			return instances[ $( object ).attr( 'data-wpview-text' ) ];
		},

		/**
		 * Given a view node, get the view's text.
		 *
		 * @param {HTMLElement} node The view node.
		 *
		 * @return {String} The textual representation of the view.
		 */
		getText: function( node ) {
			return decodeURIComponent( $( node ).attr( 'data-wpview-text' ) || '' );
		},

		/**
		 * Renders all view nodes that are not yet rendered.
		 *
		 * @param {Boolean} force Rerender all view nodes.
=======
					// There are no additional matches. If any content remains,
					// add it as an unprocessed piece.
					if ( remaining ) {
						pieces.push({ content: remaining });
					}
				});
			});

			return _.pluck( pieces, 'content' ).join('');
		},

		/**
		 * Create a placeholder for a particular view type
		 *
		 * @param viewType
		 * @param text
		 * @param options
		 *
		 */
		toView: function( viewType, text, options ) {
			var view = wp.mce.views.get( viewType ),
				encodedText = window.encodeURIComponent( text ),
				instance, viewOptions;


			if ( ! view ) {
				return text;
			}

			if ( ! wp.mce.views.getInstance( encodedText ) ) {
				viewOptions = options;
				viewOptions.type = viewType;
				viewOptions.encodedText = encodedText;
				instance = new view.View( viewOptions );
				instances[ encodedText ] = instance;
			}

			return wp.html.string({
				tag: 'div',

				attrs: {
					'class': 'wpview-wrap',
					'data-wpview-text': encodedText,
					'data-wpview-type': viewType
				},

				content: '\u00a0'
			});
		},

		/**
		 * Refresh views after an update is made
		 *
		 * @param view {object} being refreshed
		 * @param text {string} textual representation of the view
		 * @param force {Boolean} whether to force rendering
		 */
		refreshView: function( view, text, force ) {
			var encodedText = window.encodeURIComponent( text ),
				viewOptions,
				result, instance;

			instance = wp.mce.views.getInstance( encodedText );

			if ( ! instance ) {
				result = view.toView( text );
				viewOptions = result.options;
				viewOptions.type = view.type;
				viewOptions.encodedText = encodedText;
				instance = new view.View( viewOptions );
				instances[ encodedText ] = instance;
			}

			instance.render( force );
		},

		getInstance: function( encodedText ) {
			return instances[ encodedText ];
		},

		/**
		 * render( scope )
		 *
		 * Renders any view instances inside a DOM node `scope`.
		 *
		 * View instances are detected by the presence of wrapper elements.
		 * To generate wrapper elements, pass your content through
		 * `wp.mce.view.toViews( content )`.
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
		 */
		render: function( force ) {
			_.each( instances, function( instance ) {
				instance.render( force );
			} );
		},

<<<<<<< HEAD
		/**
		 * Update the text of a given view node.
		 *
		 * @param {String}         text   The new text.
		 * @param {tinymce.Editor} editor The TinyMCE editor instance the view node is in.
		 * @param {HTMLElement}    node   The view node to update.
		 */
		update: function( text, editor, node ) {
			var instance = this.getInstance( node );

			if ( instance ) {
				instance.update( text, editor, node );
			}
		},

		/**
		 * Renders any editing interface based on the view type.
		 *
		 * @param {tinymce.Editor} editor The TinyMCE editor instance the view node is in.
		 * @param {HTMLElement}    node   The view node to edit.
		 */
		edit: function( editor, node ) {
			var instance = this.getInstance( node );

			if ( instance && instance.edit ) {
				instance.edit( instance.text, function( text ) {
					instance.update( text, editor, node );
				} );
			}
		},

		/**
		 * Remove a given view node from the DOM.
		 *
		 * @param {tinymce.Editor} editor The TinyMCE editor instance the view node is in.
		 * @param {HTMLElement}    node   The view node to remove.
		 */
		remove: function( editor, node ) {
			var instance = this.getInstance( node );

			if ( instance ) {
				instance.remove( editor, node );
=======
		edit: function( node ) {
			var viewType = $( node ).data('wpview-type'),
				view = wp.mce.views.get( viewType );

			if ( view ) {
				view.edit( node );
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
			}
		}
	};

<<<<<<< HEAD
	/**
	 * A Backbone-like View constructor intended for use when rendering a TinyMCE View.
	 * The main difference is that the TinyMCE View is not tied to a particular DOM node.
	 *
	 * @param {Object} options Options.
	 */
	wp.mce.View = function( options ) {
		_.extend( this, options );
		this.initialize();
	};

	wp.mce.View.extend = Backbone.View.extend;

	_.extend( wp.mce.View.prototype, {

		/**
		 * The content.
		 *
		 * @type {*}
		 */
		content: null,

		/**
		 * Whether or not to display a loader.
		 *
		 * @type {Boolean}
		 */
		loader: true,

		/**
		 * Runs after the view instance is created.
		 */
		initialize: function() {},

		/**
		 * Retuns the content to render in the view node.
		 *
		 * @return {*}
		 */
		getContent: function() {
			return this.content;
		},

		/**
		 * Renders all view nodes tied to this view instance that are not yet rendered.
		 *
		 * @param {String} content The content to render. Optional.
		 * @param {Boolean} force Rerender all view nodes tied to this view instance.
		 */
		render: function( content, force ) {
			if ( content != null ) {
				this.content = content;
			}

			content = this.getContent();

			// If there's nothing to render an no loader needs to be shown, stop.
			if ( ! this.loader && ! content ) {
				return;
			}

			// We're about to rerender all views of this instance, so unbind rendered views.
			force && this.unbind();

			// Replace any left over markers.
			this.replaceMarkers();

			if ( content ) {
				this.setContent( content, function( editor, node, contentNode ) {
					$( node ).data( 'rendered', true );
					this.bindNode.call( this, editor, node, contentNode );
				}, force ? null : false );
			} else {
				this.setLoader();
			}
		},

		/**
		 * Binds a given node after its content is added to the DOM.
		 */
		bindNode: function() {},

		/**
		 * Unbinds a given node before its content is removed from the DOM.
		 */
		unbindNode: function() {},

		/**
		 * Unbinds all view nodes tied to this view instance.
		 * Runs before their content is removed from the DOM.
		 */
		unbind: function() {
			this.getNodes( function( editor, node, contentNode ) {
				this.unbindNode.call( this, editor, node, contentNode );
				$( node ).trigger( 'wp-mce-view-unbind' );
			}, true );
		},

		/**
		 * Gets all the TinyMCE editor instances that support views.
		 *
		 * @param {Function} callback A callback.
		 */
		getEditors: function( callback ) {
			_.each( tinymce.editors, function( editor ) {
				if ( editor.plugins.wpview ) {
					callback.call( this, editor );
				}
			}, this );
		},

		/**
		 * Gets all view nodes tied to this view instance.
		 *
		 * @param {Function} callback A callback.
		 * @param {Boolean}  rendered Get (un)rendered view nodes. Optional.
		 */
		getNodes: function( callback, rendered ) {
			this.getEditors( function( editor ) {
				var self = this;

				$( editor.getBody() )
					.find( '[data-wpview-text="' + self.encodedText + '"]' )
					.filter( function() {
						var data;

						if ( rendered == null ) {
							return true;
						}

						data = $( this ).data( 'rendered' ) === true;

						return rendered ? data : ! data;
					} )
					.each( function() {
						callback.call( self, editor, this, $( this ).find( '.wpview-content' ).get( 0 ) );
					} );
			} );
		},

		/**
		 * Gets all marker nodes tied to this view instance.
		 *
		 * @param {Function} callback A callback.
		 */
		getMarkers: function( callback ) {
			this.getEditors( function( editor ) {
				var self = this;

				$( editor.getBody() )
					.find( '[data-wpview-marker="' + this.encodedText + '"]' )
					.each( function() {
						callback.call( self, editor, this );
					} );
			} );
		},

		/**
		 * Replaces all marker nodes tied to this view instance.
		 */
		replaceMarkers: function() {
			this.getMarkers( function( editor, node ) {
				if ( $( node ).text() !== this.text ) {
					editor.dom.setAttrib( node, 'data-wpview-marker', null );
					return;
				}

				editor.dom.replace(
					editor.dom.createFragment(
						'<div class="wpview-wrap" data-wpview-text="' + this.encodedText + '" data-wpview-type="' + this.type + '">' +
							'<p class="wpview-selection-before">\u00a0</p>' +
							'<div class="wpview-body" contenteditable="false">' +
								'<div class="wpview-content wpview-type-' + this.type + '"></div>' +
							'</div>' +
							'<p class="wpview-selection-after">\u00a0</p>' +
						'</div>'
					),
					node
				);
			} );
		},

		/**
		 * Removes all marker nodes tied to this view instance.
		 */
		removeMarkers: function() {
			this.getMarkers( function( editor, node ) {
				editor.dom.setAttrib( node, 'data-wpview-marker', null );
			} );
		},

		/**
		 * Sets the content for all view nodes tied to this view instance.
		 *
		 * @param {*}        content  The content to set.
		 * @param {Function} callback A callback. Optional.
		 * @param {Boolean}  rendered Only set for (un)rendered nodes. Optional.
		 */
		setContent: function( content, callback, rendered ) {
			if ( _.isObject( content ) && content.body.indexOf( '<script' ) !== -1 ) {
				this.setIframes( content.head || '', content.body, callback, rendered );
			} else if ( _.isString( content ) && content.indexOf( '<script' ) !== -1 ) {
				this.setIframes( '', content, callback, rendered );
			} else {
				this.getNodes( function( editor, node, contentNode ) {
					content = content.body || content;

					if ( content.indexOf( '<iframe' ) !== -1 ) {
						content += '<div class="wpview-overlay"></div>';
					}

					contentNode.innerHTML = '';
					contentNode.appendChild( _.isString( content ) ? editor.dom.createFragment( content ) : content );

					callback && callback.call( this, editor, node, contentNode );
				}, rendered );
			}
		},

		/**
		 * Sets the content in an iframe for all view nodes tied to this view instance.
		 *
		 * @param {String}   head     HTML string to be added to the head of the document.
		 * @param {String}   body     HTML string to be added to the body of the document.
		 * @param {Function} callback A callback. Optional.
		 * @param {Boolean}  rendered Only set for (un)rendered nodes. Optional.
		 */
		setIframes: function( head, body, callback, rendered ) {
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
				self = this;

			this.getNodes( function( editor, node, contentNode ) {
				var dom = editor.dom,
					styles = '',
					bodyClasses = editor.getBody().className || '',
					editorHead = editor.getDoc().getElementsByTagName( 'head' )[0];

				tinymce.each( dom.$( 'link[rel="stylesheet"]', editorHead ), function( link ) {
					if ( link.href && link.href.indexOf( 'skins/lightgray/content.min.css' ) === -1 &&
						link.href.indexOf( 'skins/wordpress/wp-content.css' ) === -1 ) {

						styles += dom.getOuterHTML( link );
					}
				} );

				// Seems the browsers need a bit of time to insert/set the view nodes,
				// or the iframe will fail especially when switching Text => Visual.
				setTimeout( function() {
					var iframe, iframeDoc, observer, i;

					contentNode.innerHTML = '';

					iframe = dom.add( contentNode, 'iframe', {
						/* jshint scripturl: true */
						src: tinymce.Env.ie ? 'javascript:""' : '',
						frameBorder: '0',
						allowTransparency: 'true',
						scrolling: 'no',
						'class': 'wpview-sandbox',
						style: {
							width: '100%',
							display: 'block'
						}
					} );

					dom.add( contentNode, 'div', { 'class': 'wpview-overlay' } );

					iframeDoc = iframe.contentWindow.document;

					iframeDoc.open();

					iframeDoc.write(
						'<!DOCTYPE html>' +
						'<html>' +
							'<head>' +
								'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
								head +
								styles +
								'<style>' +
									'html {' +
										'background: transparent;' +
										'padding: 0;' +
										'margin: 0;' +
									'}' +
									'body#wpview-iframe-sandbox {' +
										'background: transparent;' +
										'padding: 1px 0 !important;' +
										'margin: -1px 0 0 !important;' +
									'}' +
									'body#wpview-iframe-sandbox:before,' +
									'body#wpview-iframe-sandbox:after {' +
										'display: none;' +
										'content: "";' +
									'}' +
								'</style>' +
							'</head>' +
							'<body id="wpview-iframe-sandbox" class="' + bodyClasses + '">' +
								body +
							'</body>' +
						'</html>'
					);

					iframeDoc.close();

					function resize() {
						var $iframe, iframeDocHeight;

						// Make sure the iframe still exists.
						if ( iframe.contentWindow ) {
							$iframe = $( iframe );
							iframeDocHeight = $( iframeDoc.body ).height();

							if ( $iframe.height() !== iframeDocHeight ) {
								$iframe.height( iframeDocHeight );
								editor.nodeChanged();
							}
						}
					}

					$( iframe.contentWindow ).on( 'load', resize );

					if ( MutationObserver ) {
						observer = new MutationObserver( _.debounce( resize, 100 ) );

						observer.observe( iframeDoc.body, {
							attributes: true,
							childList: true,
							subtree: true
						} );

						$( node ).one( 'wp-mce-view-unbind', function() {
							observer.disconnect();
						} );
					} else {
						for ( i = 1; i < 6; i++ ) {
							setTimeout( resize, i * 700 );
						}
					}

					function classChange() {
						iframeDoc.body.className = editor.getBody().className;
					}

					editor.on( 'wp-body-class-change', classChange );

					$( node ).one( 'wp-mce-view-unbind', function() {
						editor.off( 'wp-body-class-change', classChange );
					} );

					callback && callback.call( self, editor, node, contentNode );
				}, 50 );
			}, rendered );
		},

		/**
		 * Sets a loader for all view nodes tied to this view instance.
		 */
		setLoader: function() {
			this.setContent(
				'<div class="loading-placeholder">' +
					'<div class="dashicons dashicons-admin-media"></div>' +
					'<div class="wpview-loading"><ins></ins></div>' +
				'</div>'
			);
		},

		/**
		 * Sets an error for all view nodes tied to this view instance.
		 *
		 * @param {String} message  The error message to set.
		 * @param {String} dashicon A dashicon ID (optional). {@link https://developer.wordpress.org/resource/dashicons/}
		 */
		setError: function( message, dashicon ) {
			this.setContent(
				'<div class="wpview-error">' +
					'<div class="dashicons dashicons-' + ( dashicon || 'no' ) + '"></div>' +
					'<p>' + message + '</p>' +
				'</div>'
			);
		},

		/**
		 * Tries to find a text match in a given string.
		 *
		 * @param {String} content The string to scan.
		 *
		 * @return {Object}
		 */
		match: function( content ) {
			var match = wp.shortcode.next( this.type, content );

			if ( match ) {
				return {
					index: match.index,
					content: match.content,
					options: {
						shortcode: match.shortcode
					}
				};
			}
		},

		/**
		 * Update the text of a given view node.
		 *
		 * @param {String}         text   The new text.
		 * @param {tinymce.Editor} editor The TinyMCE editor instance the view node is in.
		 * @param {HTMLElement}    node   The view node to update.
		 */
		update: function( text, editor, node ) {
			_.find( views, function( view, type ) {
				var match = view.prototype.match( text );

				if ( match ) {
					$( node ).data( 'rendered', false );
					editor.dom.setAttrib( node, 'data-wpview-text', encodeURIComponent( text ) );
					wp.mce.views.createInstance( type, text, match.options ).render();
					editor.focus();

					return true;
				}
			} );
		},

		/**
		 * Remove a given view node from the DOM.
		 *
		 * @param {tinymce.Editor} editor The TinyMCE editor instance the view node is in.
		 * @param {HTMLElement}    node   The view node to remove.
		 */
		remove: function( editor, node ) {
			this.unbindNode.call( this, editor, node, $( node ).find( '.wpview-content' ).get( 0 ) );
			$( node ).trigger( 'wp-mce-view-unbind' );
			editor.dom.remove( node );
			editor.focus();
		}
	} );
} )( window, window.wp, window.jQuery );

/*
 * The WordPress core TinyMCE views.
 * Views for the gallery, audio, video, playlist and embed shortcodes,
 * and a view for embeddable URLs.
 */
( function( window, views, $ ) {
	var postID = $( '#post_ID' ).val() || 0,
		media, gallery, av, embed;

	media = {
		state: [],

		edit: function( text, update ) {
			var media = wp.media[ this.type ],
				frame = media.edit( text );

			this.pausePlayers && this.pausePlayers();

			_.each( this.state, function( state ) {
				frame.state( state ).on( 'update', function( selection ) {
					update( media.shortcode( selection ).string() );
				} );
			} );

=======
	wp.mce.views.register( 'gallery', {
		View: {
			template: media.template( 'editor-gallery' ),

			// The fallback post ID to use as a parent for galleries that don't
			// specify the `ids` or `include` parameters.
			//
			// Uses the hidden input on the edit posts page by default.
			postID: $('#post_ID').val(),

			initialize: function( options ) {
				this.shortcode = options.shortcode;
				this.fetch();
			},

			fetch: function() {
				var self = this;

				this.attachments = wp.media.gallery.attachments( this.shortcode, this.postID );
				this.dfd = this.attachments.more().done( function() {
					self.render( true );
				} );
			},

			getHtml: function() {
				var attrs = this.shortcode.attrs.named,
					attachments = false,
					options;

				// Don't render errors while still fetching attachments
				if ( this.dfd && 'pending' === this.dfd.state() && ! this.attachments.length ) {
					return '';
				}

				if ( this.attachments.length ) {
					attachments = this.attachments.toJSON();

					_.each( attachments, function( attachment ) {
						if ( attachment.sizes ) {
							if ( attrs.size && attachment.sizes[ attrs.size ] ) {
								attachment.thumbnail = attachment.sizes[ attrs.size ];
							} else if ( attachment.sizes.thumbnail ) {
								attachment.thumbnail = attachment.sizes.thumbnail;
							} else if ( attachment.sizes.full ) {
								attachment.thumbnail = attachment.sizes.full;
							}
						}
					} );
				}

				options = {
					attachments: attachments,
					columns: attrs.columns ? parseInt( attrs.columns, 10 ) : wp.media.galleryDefaults.columns
				};

				return this.template( options );
			}
		},

		edit: function( node ) {
			var gallery = wp.media.gallery,
				self = this,
				frame, data;

			data = window.decodeURIComponent( $( node ).attr('data-wpview-text') );
			frame = gallery.edit( data );

			frame.state('gallery-edit').on( 'update', function( selection ) {
				var shortcode = gallery.shortcode( selection ).string(), force;
				$( node ).attr( 'data-wpview-text', window.encodeURIComponent( shortcode ) );
				force = ( data !== shortcode );
				wp.mce.views.refreshView( self, shortcode, force );
			});

			frame.on( 'close', function() {
				frame.detach();
			});
		}
	} );

	/**
	 * These are base methods that are shared by the audio and video shortcode's MCE controller.
	 *
	 * @mixin
	 */
	wp.mce.av = {
		View: {
			overlay: true,

			action: 'parse-media-shortcode',

			initialize: function( options ) {
				var self = this;

				this.shortcode = options.shortcode;

				_.bindAll( this, 'setIframes', 'setNodes', 'fetch', 'stopPlayers' );
				$( this ).on( 'ready', this.setNodes );

				$( document ).on( 'media:edit', this.stopPlayers );

				this.fetch();

				this.getEditors( function( editor ) {
					editor.on( 'hide', function () {
						mediaWindows = [];
						windowIdx = 0;
						self.stopPlayers();
					} );
				});
			},

			pauseOtherWindows: function ( win ) {
				_.each( mediaWindows, function ( mediaWindow ) {
					if ( mediaWindow.sandboxId !== win.sandboxId ) {
						_.each( mediaWindow.mejs.players, function ( player ) {
							player.pause();
						} );
					}
				} );
			},

			iframeLoaded: function (win) {
				return _.bind( function () {
					var callback;
					if ( ! win.mejs || _.isEmpty( win.mejs.players ) ) {
						return;
					}

					win.sandboxId = windowIdx;
					windowIdx++;
					mediaWindows.push( win );

					callback = _.bind( function () {
						this.pauseOtherWindows( win );
					}, this );

					if ( ! _.isEmpty( win.mejs.MediaPluginBridge.pluginMediaElements ) ) {
						_.each( win.mejs.MediaPluginBridge.pluginMediaElements, function ( mediaElement ) {
							mediaElement.addEventListener( 'play', callback );
						} );
					}

					_.each( win.mejs.players, function ( player ) {
						$( player.node ).on( 'play', callback );
					}, this );
				}, this );
			},

			listenToSandboxes: function () {
				_.each( this.getNodes(), function ( node ) {
					var win, iframe = $( '.wpview-sandbox', node ).get( 0 );
					if ( iframe && ( win = iframe.contentWindow ) ) {
						$( win ).load( _.bind( this.iframeLoaded( win ), this ) );
					}
				}, this );
			},

			deferredListen: function () {
				window.setTimeout( _.bind( this.listenToSandboxes, this ), this.getNodes().length * waitInterval );
			},

			setNodes: function () {
				if ( this.parsed ) {
					this.setIframes( this.parsed.head, this.parsed.body );
					this.deferredListen();
				} else {
					this.fail();
				}
			},

			fetch: function () {
				var self = this;

				wp.ajax.send( this.action, {
					data: {
						post_ID: $( '#post_ID' ).val() || 0,
						type: this.shortcode.tag,
						shortcode: this.shortcode.string()
					}
				} )
				.done( function( response ) {
					if ( response ) {
						self.parsed = response;
						self.setIframes( response.head, response.body );
						self.deferredListen();
					} else {
						self.fail( true );
					}
				} )
				.fail( function( response ) {
					self.fail( response || true );
				} );
			},

			fail: function( error ) {
				if ( ! this.error ) {
					if ( error ) {
						this.error = error;
					} else {
						return;
					}
				}

				if ( this.error.message ) {
					if ( ( this.error.type === 'not-embeddable' && this.type === 'embed' ) || this.error.type === 'not-ssl' ||
						this.error.type === 'no-items' ) {

						this.setError( this.error.message, 'admin-media' );
					} else {
						this.setContent( '<p>' + this.original + '</p>', 'replace' );
					}
				} else if ( this.error.statusText ) {
					this.setError( this.error.statusText, 'admin-media' );
				} else if ( this.original ) {
					this.setContent( '<p>' + this.original + '</p>', 'replace' );
				}
			},

			stopPlayers: function( remove ) {
				var rem = remove === 'remove';

				this.getNodes( function( editor, node, content ) {
					var p, win,
						iframe = $( 'iframe.wpview-sandbox', content ).get(0);

					if ( iframe && ( win = iframe.contentWindow ) && win.mejs ) {
						// Sometimes ME.js may show a "Download File" placeholder and player.remove() doesn't exist there.
						try {
							for ( p in win.mejs.players ) {
								win.mejs.players[p].pause();

								if ( rem ) {
									win.mejs.players[p].remove();
								}
							}
						} catch( er ) {}
					}
				});
			},

			unbind: function() {
				this.stopPlayers( 'remove' );
			}
		},

		/**
		 * Called when a TinyMCE view is clicked for editing.
		 * - Parses the shortcode out of the element's data attribute
		 * - Calls the `edit` method on the shortcode model
		 * - Launches the model window
		 * - Bind's an `update` callback which updates the element's data attribute
		 *   re-renders the view
		 *
		 * @param {HTMLElement} node
		 */
		edit: function( node ) {
			var media = wp.media[ this.type ],
				self = this,
				frame, data, callback;

			$( document ).trigger( 'media:edit' );

			data = window.decodeURIComponent( $( node ).attr('data-wpview-text') );
			frame = media.edit( data );
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
			frame.on( 'close', function() {
				frame.detach();
			} );

<<<<<<< HEAD
=======
			callback = function( selection ) {
				var shortcode = wp.media[ self.type ].shortcode( selection ).string();
				$( node ).attr( 'data-wpview-text', window.encodeURIComponent( shortcode ) );
				wp.mce.views.refreshView( self, shortcode );
				frame.detach();
			};
			if ( _.isArray( self.state ) ) {
				_.each( self.state, function (state) {
					frame.state( state ).on( 'update', callback );
				} );
			} else {
				frame.state( self.state ).on( 'update', callback );
			}
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
			frame.open();
		}
	};

<<<<<<< HEAD
	gallery = _.extend( {}, media, {
		state: [ 'gallery-edit' ],
		template: wp.media.template( 'editor-gallery' ),

		initialize: function() {
			var attachments = wp.media.gallery.attachments( this.shortcode, postID ),
				attrs = this.shortcode.attrs.named,
				self = this;

			attachments.more()
			.done( function() {
				attachments = attachments.toJSON();

				_.each( attachments, function( attachment ) {
					if ( attachment.sizes ) {
						if ( attrs.size && attachment.sizes[ attrs.size ] ) {
							attachment.thumbnail = attachment.sizes[ attrs.size ];
						} else if ( attachment.sizes.thumbnail ) {
							attachment.thumbnail = attachment.sizes.thumbnail;
						} else if ( attachment.sizes.full ) {
							attachment.thumbnail = attachment.sizes.full;
						}
					}
				} );

				self.render( self.template( {
					attachments: attachments,
					columns: attrs.columns ? parseInt( attrs.columns, 10 ) : wp.media.galleryDefaults.columns
				} ) );
			} )
			.fail( function( jqXHR, textStatus ) {
				self.setError( textStatus );
			} );
		}
	} );

	av = _.extend( {}, media, {
		action: 'parse-media-shortcode',

		initialize: function() {
			var self = this;

			if ( this.url ) {
				this.loader = false;
				this.shortcode = wp.media.embed.shortcode( {
					url: this.text
				} );
			}

			wp.ajax.post( this.action, {
				post_ID: postID,
				type: this.shortcode.tag,
				shortcode: this.shortcode.string()
			} )
			.done( function( response ) {
				self.render( response );
			} )
			.fail( function( response ) {
				if ( self.url ) {
					self.removeMarkers();
				} else {
					self.setError( response.message || response.statusText, 'admin-media' );
				}
			} );

			this.getEditors( function( editor ) {
				editor.on( 'wpview-selected', function() {
					self.pausePlayers();
				} );
			} );
		},

		pausePlayers: function() {
			this.getNodes( function( editor, node, content ) {
				var win = $( 'iframe.wpview-sandbox', content ).get( 0 );

				if ( win && ( win = win.contentWindow ) && win.mejs ) {
					_.each( win.mejs.players, function( player ) {
						try {
							player.pause();
						} catch ( e ) {}
					} );
				}
			} );
		}
	} );

	embed = _.extend( {}, av, {
		action: 'parse-embed',

		edit: function( text, update ) {
			var media = wp.media.embed,
				frame = media.edit( text, this.url ),
				self = this;

			this.pausePlayers();

			frame.state( 'embed' ).props.on( 'change:url', function( model, url ) {
				if ( url && model.get( 'url' ) ) {
					frame.state( 'embed' ).metadata = model.toJSON();
				}
			} );

			frame.state( 'embed' ).on( 'select', function() {
				var data = frame.state( 'embed' ).metadata;

				if ( self.url ) {
					update( data.url );
				} else {
					update( media.shortcode( data ).string() );
				}
			} );

			frame.on( 'close', function() {
				frame.detach();
			} );

			frame.open();
		}
	} );

	views.register( 'gallery', _.extend( {}, gallery ) );

	views.register( 'audio', _.extend( {}, av, {
		state: [ 'audio-details' ]
	} ) );

	views.register( 'video', _.extend( {}, av, {
		state: [ 'video-details' ]
	} ) );

	views.register( 'playlist', _.extend( {}, av, {
		state: [ 'playlist-edit', 'video-playlist-edit' ]
	} ) );

	views.register( 'embed', _.extend( {}, embed ) );

	views.register( 'embedURL', _.extend( {}, embed, {
		match: function( content ) {
			var re = /(^|<p>)(https?:\/\/[^\s"]+?)(<\/p>\s*|$)/gi,
				match = re.exec( content );

			if ( match ) {
				return {
					index: match.index + match[1].length,
					content: match[2],
					options: {
						url: true
					}
				};
			}
		}
	} ) );
} )( window, window.wp.mce.views, window.jQuery );
=======
	/**
	 * TinyMCE handler for the video shortcode
	 *
	 * @mixes wp.mce.av
	 */
	wp.mce.views.register( 'video', _.extend( {}, wp.mce.av, {
		state: 'video-details'
	} ) );

	/**
	 * TinyMCE handler for the audio shortcode
	 *
	 * @mixes wp.mce.av
	 */
	wp.mce.views.register( 'audio', _.extend( {}, wp.mce.av, {
		state: 'audio-details'
	} ) );

	/**
	 * TinyMCE handler for the playlist shortcode
	 *
	 * @mixes wp.mce.av
	 */
	wp.mce.views.register( 'playlist', _.extend( {}, wp.mce.av, {
		state: [ 'playlist-edit', 'video-playlist-edit' ]
	} ) );

	/**
	 * TinyMCE handler for the embed shortcode
	 */
	wp.mce.embedMixin = {
		View: _.extend( {}, wp.mce.av.View, {
			overlay: true,
			action: 'parse-embed',
			initialize: function( options ) {
				this.content = options.content;
				this.original = options.url || options.shortcode.string();

				if ( options.url ) {
					this.shortcode = media.embed.shortcode( {
						url: options.url
					} );
				} else {
					this.shortcode = options.shortcode;
				}

				_.bindAll( this, 'setIframes', 'setNodes', 'fetch' );
				$( this ).on( 'ready', this.setNodes );

				this.fetch();
			}
		} ),
		edit: function( node ) {
			var embed = media.embed,
				self = this,
				frame,
				data,
				isURL = 'embedURL' === this.type;

			$( document ).trigger( 'media:edit' );

			data = window.decodeURIComponent( $( node ).attr('data-wpview-text') );
			frame = embed.edit( data, isURL );
			frame.on( 'close', function() {
				frame.detach();
			} );
			frame.state( 'embed' ).props.on( 'change:url', function (model, url) {
				if ( ! url ) {
					return;
				}
				frame.state( 'embed' ).metadata = model.toJSON();
			} );
			frame.state( 'embed' ).on( 'select', function() {
				var shortcode;

				if ( isURL ) {
					shortcode = frame.state( 'embed' ).metadata.url;
				} else {
					shortcode = embed.shortcode( frame.state( 'embed' ).metadata ).string();
				}
				$( node ).attr( 'data-wpview-text', window.encodeURIComponent( shortcode ) );
				wp.mce.views.refreshView( self, shortcode );
				frame.detach();
			} );
			frame.open();
		}
	};

	wp.mce.views.register( 'embed', _.extend( {}, wp.mce.embedMixin ) );

	wp.mce.views.register( 'embedURL', _.extend( {}, wp.mce.embedMixin, {
		toView: function( content ) {
			var re = /(?:^|<p>)(https?:\/\/[^\s"]+?)(?:<\/p>\s*|$)/gi,
				match = re.exec( tinymce.trim( content ) );

			if ( ! match ) {
				return;
			}

			return {
				index: match.index,
				content: match[0],
				options: {
					url: match[1]
				}
			};
		}
	} ) );

}(jQuery));
>>>>>>> 785b53a76ca09e05a97442b02dd60c4cb2060135
