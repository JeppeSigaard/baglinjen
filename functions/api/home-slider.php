<?php

add_filter( 'rest_prepare_page', 'smamo_rest_add_slides_to_home_page', 10, 3 );
function smamo_rest_add_slides_to_home_page( $data, $post, $request ) {
  $_data = $data->data;
  $home_page = get_option('page_on_front');
  if($post->ID == $home_page){

    $slides_array = array();
    $slides = get_posts(array(
      'post_type' => 'any',
      'posts_per_page' => -1,
      'meta_key' => 'smamo_featured',
      'meta_value' => '1',
    ));

    foreach($slides as $slide){
      $slides_array[] = get_permalink($slide->ID);
    }
    $_data['home_slider'] = $slides_array;
  }
  $data->data = $_data;
	return $data;
}
