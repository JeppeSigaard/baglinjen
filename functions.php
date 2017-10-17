<?php

get_functions_part(array(
  'images',
  'menus',
  'scripts',
));

get_functions_part(array(
  'images',
  'menus',
  'by_url',
),'api');


// get_functions_part([$filnavn],[$undermappe]);
function smamo_include_functions_part_if_exists($fetch, $in = false){
  if ($in){$fetch = $in . '/' . $fetch;}
  $fetch = get_template_directory() . '/functions/' . $fetch . '.php';
  if(file_exists($fetch)){include_once $fetch;}
  else{wp_die('file does not exist ' . $fetch);}
}

function get_functions_part($fetch, $in = false){
  if(is_array($fetch)){foreach($fetch as $p){smamo_include_functions_part_if_exists($p,$in);}}
  else{smamo_include_functions_part_if_exists($fetch,$in);}
}

function isSecure() {
  return
    (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || $_SERVER['SERVER_PORT'] == 443;
}
