<?php

add_action( 'init', function(){

  register_nav_menus( array(
      'navbar' => 'Hovemenu',
      'topbar' => 'Topmenu',
  ));
  
});
