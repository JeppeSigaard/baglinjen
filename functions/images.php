<?php

add_theme_support('post-thumbnails');
add_theme_support('custom-logo');

add_image_size( 'widescreen', $width = 1600, $height = 900, $crop = true );
add_image_size( 'postbox', $width = 230, $height = 130, $crop = true );
add_image_size( 'sponsorslider', $width = 400, $height = 320, $crop = true );
