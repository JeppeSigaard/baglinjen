<?php

add_action( 'init', 'smamo_rest_post_author', 12 );

function smamo_rest_post_author() {

	// Compatibility with the REST API v2 beta 9+
	if ( function_exists( 'register_rest_field' ) ) {
		register_rest_field( 'post',
			'authors',
			array(
				'get_callback' => 'smamo_rest_get_post_author',
				'schema'       => null,
			)
		);
	} elseif ( function_exists( 'register_api_field' ) ) {
		register_api_field( 'post',
			'authors',
			array(
				'get_callback' => 'smamo_rest_get_post_author',
				'schema'       => null,
			)
		);
	}
}

function smamo_rest_prepare_author($id){
  $usr = get_user_by('id', $id);
  if(!$usr) return array();

  $author_link = '#';
  $author_posts = get_posts(array('post_type' => 'author', 'posts_per_page' => 1, 'meta_key' => 'smamo_post_author', 'meta_value' => $id));
  if ($author_posts) {foreach ($author_posts as $author) {
    $author_link = get_permalink($author->ID);
  }}

  return array(
    'email' => $usr->data->user_email,
    'name' => $usr->data->display_name,
    'link' => $author_link,
  );
}

function smamo_rest_get_post_author( $object, $field_name, $request ) {
  $response = array();

  $authors = get_post_meta($object['id'], 'smamo_post_author', false);
  if ($authors && !empty($authors) && !empty($authors[0])){
    foreach($authors as $a){
      $response[] = smamo_rest_prepare_author($a);
    }
  }
  else{
    $author = get_post_field( 'post_author', $object['id'] );
    $response[] = smamo_rest_prepare_author($author);
  }

  return $response;
}
