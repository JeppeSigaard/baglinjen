<?php
/*
Title: Forfattere
Post Type: post
scope: post_meta
context: side
order: 1
*/

$author_list = array(0 => 'Vælg forfatter');
$authors = get_users();
foreach ($authors as $user) {
  $author_list[$user->ID] = $user->display_name;
}

piklist('field', array(
  'type' => 'select',
  'add_more' => true,
  'field' => 'smamo_post_author',
  'label' => 'Tilføj forfattere',
  'choices' => $author_list,
));
