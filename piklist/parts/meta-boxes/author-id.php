<?php
/*
  title: Bruger
  context: side
  post type: author
*/

$author_list = array(0 => 'Vælg forfatter');
$authors = get_users();
foreach ($authors as $user) {
  $author_list[$user->ID] = $user->display_name;
}

piklist('field', array(
  'type' => 'select',
  'field' => 'smamo_post_author',
  'label' => 'Tilføj bruger',
  'choices' => $author_list,
));
