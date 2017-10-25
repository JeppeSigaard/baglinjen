<?php

add_action( 'init', 'smamo_rest_category_color', 12 );

function smamo_rest_category_color() {

	// Compatibility with the REST API v2 beta 9+
	if ( function_exists( 'register_rest_field' ) ) {
		register_rest_field( 'post',
			'category',
			array(
				'get_callback' => 'smamo_rest_api_get_category',
				'schema'       => null,
			)
		);

		register_rest_field( 'category',
			'color',
			array(
				'get_callback' => 'smamo_rest_api_get_category_color',
				'schema'       => null,
			)
		);
	} elseif ( function_exists( 'register_api_field' ) ) {
		register_api_field( 'post',
			'category',
			array(
				'get_callback' => 'smamo_rest_api_get_category',
				'schema'       => null,
			)
		);

		register_api_field( 'category',
			'color',
			array(
				'get_callback' => 'smamo_rest_api_get_category_color',
				'schema'       => null,
			)
		);
	}
}

function smamo_rest_api_get_category( $object, $field_name, $request ){

  $response = array();

  $cats = wp_get_post_categories($object['id']);
  if (isset($cats[0])){
    $cat_id = $cats[0];
    $cat = get_term_by('term_id', $cat_id, 'category');

    $response['id'] = $cat_id;
    $response['name'] = $cat->name;
    $response['slug'] = $cat->slug;
    $response['description'] = $cat->description;
    $response['color'] = get_term_meta($cat_id, 'smamo_tax_color', true);

  }

  return $response;
}


function smamo_rest_api_get_category_color($object, $field_name, $request){
	$term_id = $object['id'];

	return get_term_meta($term_id, 'smamo_tax_color', true);
}
