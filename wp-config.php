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
define('AUTH_KEY',         '29b$Xz6tr-sww_PryVBRC%BYYZ|*!Rq~au%^|0[B_TP${6M%FIhbB?oc1?Z9*!*d');
define('SECURE_AUTH_KEY',  '{dM 9;oya~]+MU3#zT}I6`{ ~l#Q|5L5~,KGen,Ryz8)p<gjl9juIt^v>s%Lyu}u');
define('LOGGED_IN_KEY',    '+$Ne0;wdY#gl&L6_fJQgk`_95f<HKcyW4@gpixcprjFKF&&8L`VnlWk}V*EQxIWt');
define('NONCE_KEY',        'CxtzC2r<OX<]^+x2hWP+Y~,QpqI.CAIFBTx4o3:+*,LstW,`J-*Xu`MF/^;S7nh-');
define('AUTH_SALT',        'V,`/)S-  %|L]DadTK;i4#X)|v8N5I%o9 v~-o=;+(%zztqf4L3Bmm{/$}5DK+Xk');
define('SECURE_AUTH_SALT', 'rYYApQ@y#DLXQ87|h+]J;LE:;4l]6ThzV42*RirR_kL=#ET8abU)vLN!Nm%4qIt0');
define('LOGGED_IN_SALT',   't=v1E>~Klt[7P$omjlX5f1U|F^9fh?z+a5n-4Ue^I6+.ZAUp#|-D`<+YnM|oK6:`');
define('NONCE_SALT',       ')qhT{4D5}|Co|0~0d&SekS4g$!z|ez ,$:[F[#ZS@|e%;*BCg-AJ-AE`OB|@ c(W');

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
