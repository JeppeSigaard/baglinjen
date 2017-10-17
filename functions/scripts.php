<?php

add_action( 'wp_enqueue_scripts', 'bl_add_react', 10, 0 );
function bl_add_react(){
  wp_enqueue_script(
    'react', get_template_directory_uri() . '/js/script-min.js',
    null, '1.0.0', true
  );
}
