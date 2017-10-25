<?php

add_filter( 'rest_prepare_post', 'smamo_rest_prepare_post', 10, 3 );
function smamo_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;

  // Remove content from post
  if ( isset($post->post_type) && in_array($post->post_type, array('post','author','sponsor'))) {
		unset( $_data['content'] );
	}

  // Remove all kinds of nonsense
  foreach(array(
    'sticky',
    'format',
    'comment_status',
    'ping_status',
    'status',
    'categories',
    'meta',
    'featured_media',
    'guid',
		'author',
		'modified',
		'modified_gmt',
  ) as $key){
    unset($_data[$key]);
  }

	$data->data = $_data;
	return $data;
}
