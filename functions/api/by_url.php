<?php

function smamo_rest_by_url($data){
  $url = (isset($data['url'])) ? esc_attr($data['url']) : false;

  if (!$url) {
    return new WP_Error('rest_no_route', 'no posts found', array('status' => 404));
  }

  // return a single page, post or cpt
  $postid = url_to_postid( $url );
  if ($postid){
    $post_type = get_post_type($postid);
    $rest = new WP_REST_Posts_Controller($post_type);
    $response = $rest->get_item(array('id' => $postid));

    $response->data['template'] = 'single';
    if (get_option( 'page_on_front' ) == $postid){
      $response->data['template'] = 'home';
    }

    return $response;
  }

  // Return an archive or a taxonomy
  $json_from_url = wp_remote_get( $url . '?format=json');
  $query = json_decode( $json_from_url['body'] );


  $result = array(
    'link' => $url,
    'type' => ($query->is_404) ? '404' : 'archive',
    'template' => ($query->is_404) ? '404' : 'archive',
    'posts' => array(),
    'id' => isset($query->queried_object->ID) ? $query->queried_object_id : '',
    'term_id' => isset($query->queried_object->term_id) ? $query->queried_object_id : '',
  );

  $rest = new WP_REST_Posts_Controller('post');
  foreach($query->posts as $post){
      $post_rest = $rest->get_item(array('id' => $post->ID));
      $result['posts'][] = $post_rest->data;
  }

  // If page
  if(isset($query->queried_object->ID)){
    $page_rest = new WP_REST_Posts_Controller('page');
    $page = $page_rest->get_item(array('id' => $query->queried_object_id ));
    $result['post'] = $page->data;

    $result['post']['template'] = 'archive';
  }

  // if taxonomy
  if(isset($query->queried_object->term_id)){
    $result['title']['rendered'] = $query->queried_object->name;
    $result['content']['rendered'] = '<p>' . $query->queried_object->description .'</p>';
    $result['slug'] = $query->queried_object->slug;
    $result['featured_image'] = null;
  }


  return $result;


  // Fail
  return new WP_Error('rest_no_route', $url . ' returned nottin\'', array('status' => 404));


}

add_action( 'rest_api_init', function () {

  register_rest_route( 'wp/v2', 'by_url/(?<url>(.*)+)', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_by_url',
	) );

} );
