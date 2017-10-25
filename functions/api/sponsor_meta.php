<?php

add_action( 'init', 'smamo_rest_sponsor_meta', 12 );

function smamo_rest_sponsor_meta() {

  register_rest_field( 'sponsor',
		'settings',
		array(
			'get_callback' => 'smamo_rest_get_sponsor_meta',
			'schema' => null,
		)
	);
}

function smamo_rest_get_sponsor_meta( $object, $field_name, $request ) {
  $response = array();
  $id = $object['id'];


  $dark_icon = wp_get_attachment_image_src(
    get_post_meta($id,'smamo_sponsor_icon_dark', true), 'full');

  $light_icon = wp_get_attachment_image_src(
    get_post_meta($id,'smamo_sponsor_icon_light', true), 'full');

  $response['featured'] = get_post_meta($id,'smamo_main_sponsor', true);
  $response['icon_dark']= isset($dark_icon[0]) ? $dark_icon[0] : '';
  $response['icon_light']= isset($light_icon[0]) ? $light_icon[0] : '';

  return $response;
}
