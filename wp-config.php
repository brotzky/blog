<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
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
define('DB_NAME', 'blogLocal');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

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
define('AUTH_KEY',         '>67=Hxcs_<`MQi^{0C(I%-EQmjvO`wAPOe3Ca^nPYr*Q+h^E]>0S_[Pk^])9k20L');
define('SECURE_AUTH_KEY',  'eLLnBci=%*J>2r_N+-YhKKd]/n(o)p_3{+tn9;O i_g|ksqO1I?<y08fw)w1pTFG');
define('LOGGED_IN_KEY',    'lz|0OnB,ycY0lD>AyK8[+8MawkO9]vpyDz|7Nj_[!V:>5b[tncm{DSwB(+>.P:7/');
define('NONCE_KEY',        '30PI&Kj,Jc]VR|x4Rrk_Q~4}Uf&DM 4IRsNMxI-6UqBk-LrZc,AN).?+H3l]|3_X');
define('AUTH_SALT',        '|R&}FPjXwcr5xP]}%`x<4T#;1z||#M2q/+<U4Xs++7Ls@M!Y7C4XP_-.% yI-X=#');
define('SECURE_AUTH_SALT', '{,C[cgx{}#X|,dpDebtSQrM#s]Wi/Gw{ZXw_NJ>)lJ|9VXH5@xL]pS[|S<F|3%~v');
define('LOGGED_IN_SALT',   '5vxQ_gTjFgfHL3LcL-lL5s&+4ogGD~9(~fE0B+5!tXD?N<a>Ql/,lUt0]`44r+1K');
define('NONCE_SALT',       'ff!a[=+cikiT8v%4,l~li5]5qR<PC)p[np`+)<IGx9[2[.Y)(^ni;`]Y@15jgx|*');

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
