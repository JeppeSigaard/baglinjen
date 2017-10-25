<?php

add_action( 'init', 'smamo_rest_post_media', 12 );

function smamo_rest_post_media() {

	$types = array('post','author','sponsor');

	// Compatibility with the REST API v2 beta 9+
	if ( function_exists( 'register_rest_field' ) ) {
		register_rest_field( $types,
			'media',
			array(
				'get_callback' => 'smamo_rest_get_post_media',
				'schema'       => null,
			)
		);
	} elseif ( function_exists( 'register_api_field' ) ) {
		register_api_field( $types,
			'media',
			array(
				'get_callback' => 'smamo_rest_get_post_media',
				'schema'       => null,
			)
		);
	}
}

function smamo_rest_get_post_media( $object, $field_name, $request ) {
  $response = array();

  $video = get_post_meta($object['id'], 'smamo_post_video', true);
  if ($video){
    $response['video'] = $video;
  }

  $audio = get_post_meta($object['id'], 'smamo_post_audio', true);
  if ($audio){
    $response['audio'] = $audio;
  }

  return $response;
}
