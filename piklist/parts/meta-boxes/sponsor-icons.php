<?php
/*
  title: Sponsorikoner
  context: side
  post type: sponsor
*/

piklist('field', array(
  'field' => 'smamo_sponsor_icon_dark',
  'label' => 'Mørkt ikon',
  'type' => 'file',
  'options' => array(
    'multiple' => false
  )
));

piklist('field', array(
  'field' => 'smamo_sponsor_icon_light',
  'label' => 'Lyst ikon',
  'type' => 'file',
  'options' => array(
    'multiple' => false
  )
));
