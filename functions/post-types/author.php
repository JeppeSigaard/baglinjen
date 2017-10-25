<?php

// Author
add_action( 'init', 'smamo_add_post_type_author' );
function smamo_add_post_type_author() {
	register_post_type( 'author', array(

    'menu_icon' 		 => 'dashicons-businessman',
  	'public'             => true,
  	'publicly_queryable' => true,
  	'show_ui'            => true,
  	'show_in_menu'       => true,
  	'query_var'          => false,
  	'rewrite'            => array( 'slug' => 'forfatter' ),
  	'capability_type'    => 'post',
  	'has_archive'        => false,
  	'hierarchical'       => false,
  	'menu_position'      => 21,
  	'supports'           => array( 'title', 'thumbnail'),
    'show_in_rest'       => true,
    'rest_controller_class' => 'WP_REST_Posts_Controller',
      'labels'             => array(
        'name'               => _x( 'Forfattere', 'post type general name', 'smamo' ),
        'singular_name'      => _x( 'Forfatter', 'post type singular name', 'smamo' ),
        'menu_name'          => _x( 'Forfattere', 'admin menu', 'smamo' ),
        'name_admin_bar'     => _x( 'Forfattere', 'add new on admin bar', 'smamo' ),
        'add_new'            => _x( 'Tilføj ny ', 'forfatter', 'smamo' ),
        'add_new_item'       => __( 'Tilføj ny', 'smamo' ),
        'new_item'           => __( 'Ny forfatter', 'smamo' ),
        'edit_item'          => __( 'Rediger', 'smamo' ),
        'view_item'          => __( 'Se forfatter', 'smamo' ),
        'all_items'          => __( 'Se alle', 'smamo' ),
        'search_items'       => __( 'Find forfatter', 'smamo' ),
        'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
        'not_found'          => __( 'Start med at oprette en ny forfatter.', 'smamo' ),
        'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
      ),
    )
  );
}
