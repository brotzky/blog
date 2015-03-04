<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'blog');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Aaq;Y?QAz)hYtVJ[5WkO[}Mc|j!D8.v>LZmq*_`Hb~rZ~Gcltp_#<5R`K{^NWz<-');
define('SECURE_AUTH_KEY',  'XYuoEG}e!df-V8g?ctx|<(3<d`~E?c6gUa;V)94JB5>ehTDp5Si},Mb+-+5aYG}[');
define('LOGGED_IN_KEY',    '}(}-WWbq~,vO8]G*~cYu1!=f3Mue&@>t>EKBtiz8@+S6i>0|eTn)C+Cy6+.2X4kh');
define('NONCE_KEY',        'l]wbG5z^,gr:<@X{bA0!*H c?x40oE_J^g,P+8]M[C9)G1)fe13Z$4Eurf Rv?Y~');
define('AUTH_SALT',        'DOtkYK@@#&We+J~*2!l]]ubgXd-MOP42MmFU]VLtg8mx<wn<[_w[T{J>~VUYoGh ');
define('SECURE_AUTH_SALT', 'XtL0RkO}S?$Q}0F=Q.wd+D&Z&m{<2|=aV)yil|YEDv+%_US@=C?}iL*BF|VU836}');
define('LOGGED_IN_SALT',   '|g-X,[?3BN:fQ&x) 2w2{6.mg;O~nz]%!d.0++>05DlCL$-tkyS+hC4Pys7pEbQg');
define('NONCE_SALT',       'F%h u+nP>n`-_dynH}RC-uipn6C^:b0PUY9]XH)$:c<x@W!pw0,u1gaa[Y+YgDqo');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
