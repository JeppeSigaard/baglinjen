<?php

add_action( 'init', 'smamo_rest_content_blocks', 12 );

function smamo_rest_content_blocks() {

	$types = array('post','author','sponsor');

	// Compatibility with the REST API v2 beta 9+
	if ( function_exists( 'register_rest_field' ) ) {
		register_rest_field( $types,
			'content_blocks',
			array(
				'get_callback' => 'smamo_rest_api_get_content_blocks',
				'schema'       => null,
			)
		);
	} elseif ( function_exists( 'register_api_field' ) ) {
		register_api_field( $types,
			'content_blocks',
			array(
				'get_callback' => 'smamo_rest_api_get_content_blocks',
				'schema'       => null,
			)
		);
	}
}

function smamo_rest_api_get_content_blocks( $object, $field_name, $request ) {
  $response = array();
  $blocks = get_post_meta($object['id'], 'smamo_content_blocks', true);
  if (!$blocks) return $response;

  foreach($blocks as $block){
    $type = $block['type'];

    // Returns a text block
    if(in_array($type, array('h2','h3','h4', 'paragraph', 'blockquote'))){
      $response[] = array(
        'type' => $type,
        'content' => $block['multiline'],
      );

    }

		// Returns Links
		if('link_box' === $type){
			$response[] = array(
				'type' => 'link_box',
				'links' => $block['links'],
			);
		}

		// Returns a single image
		if('image_single' === $type){

			$image_sizes = get_intermediate_image_sizes();
			$image = array();
			foreach($image_sizes as $s){
				$result = wp_get_attachment_image_src( $block['image_single'][0], $s );
				$image[$s] = $result[0];
			}
			$response[] = array(
				'type' => 'image',
				'image' => $image,
			);
		}

		// Returns a gallery
    if('gallery' == $type && isset($block['images'])){
      $gallery = array('type' => 'gallery');
      $image_sizes = get_intermediate_image_sizes();
      foreach($block['images'] as $img){
        $image = array();
        foreach($image_sizes as $s){
          $result = wp_get_attachment_image_src( $img, $s );
          $image[$s] = $result[0];
        }
        $gallery['images'][] = $image;
      }
      $response[] = $gallery;
    }
  }

  return $response;
}
