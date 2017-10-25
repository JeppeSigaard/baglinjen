<?php
/*
Title: Featured
Post Type: post
scope: post_meta
context: side
order: 1
*/

piklist('field', array(
  'type' => 'checkbox',
  'field' => 'smamo_featured',
  'label' => 'Fremhævet indlæg',
  'choices' => array(
    '1' => 'Vis i forsideslider'
  ),
));
