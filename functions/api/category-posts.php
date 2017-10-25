<?php

add_action( 'init', 'smamo_rest_category_posts', 12 );

function smamo_rest_category_posts() {

	// Compatibility with the REST API v2 beta 9+
	if ( function_exists( 'register_rest_field' ) ) {

		register_rest_field( 'category',
			'posts',
			array(
				'get_callback' => 'smamo_rest_api_get_category_posts',
				'schema'       => null,
			)
		);
	} elseif ( function_exists( 'register_api_field' ) ) {

		register_api_field( 'category',
			'posts',
			array(
				'get_callback' => 'smamo_rest_api_get_category_posts',
				'schema'       => null,
			)
		);
	}
}

function smamo_rest_api_get_category_posts($object, $field_name, $request){
  $response = array();

  $posts = get_posts(array(
    'tax_query' => array(
      array(
        'taxonomy' => 'category',
        'field' => 'id',
        'terms' => $object['id'],
      ),
    ),
    'fields' => 'ids',
    'posts_per_page' => -1,
  ));

  foreach($posts as $post_ID){
  	$data = smamo_rest_by_url(array( 'url' =>get_permalink($post_ID)));
		$response[] = $data->data;
  }

  return $response;
}
