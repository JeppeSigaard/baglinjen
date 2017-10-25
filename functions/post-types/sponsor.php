<?php

// Sponsor
add_action( 'init', 'smamo_add_post_type_sponsor' );
function smamo_add_post_type_sponsor() {
	register_post_type( 'sponsor', array(

    'menu_icon' 		 => 'dashicons-carrot',
  	'public'             => true,
  	'publicly_queryable' => true,
  	'show_ui'            => true,
  	'show_in_menu'       => true,
  	'query_var'          => false,
  	'rewrite'            => array( 'slug' => 'sponsor' ),
  	'capability_type'    => 'post',
  	'has_archive'        => false,
  	'hierarchical'       => false,
  	'menu_position'      => 21,
  	'supports'           => array( 'title', 'thumbnail'),
    'show_in_rest'       => true,
    'rest_controller_class' => 'WP_REST_Posts_Controller',
      'labels'             => array(
        'name'               => _x( 'Sponsorer', 'post type general name', 'smamo' ),
        'singular_name'      => _x( 'Sponsor', 'post type singular name', 'smamo' ),
        'menu_name'          => _x( 'Sponsorer', 'admin menu', 'smamo' ),
        'name_admin_bar'     => _x( 'Sponsorer', 'add new on admin bar', 'smamo' ),
        'add_new'            => _x( 'Tilføj ny ', 'sponsor', 'smamo' ),
        'add_new_item'       => __( 'Tilføj ny', 'smamo' ),
        'new_item'           => __( 'Ny sponsor', 'smamo' ),
        'edit_item'          => __( 'Rediger', 'smamo' ),
        'view_item'          => __( 'Se sponsor', 'smamo' ),
        'all_items'          => __( 'Se alle', 'smamo' ),
        'search_items'       => __( 'Find sponsor', 'smamo' ),
        'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
        'not_found'          => __( 'Start med at oprette en ny sponsor.', 'smamo' ),
        'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
      ),
    )
  );
}
