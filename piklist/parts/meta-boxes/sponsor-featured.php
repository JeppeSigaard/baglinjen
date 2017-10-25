<?php
/*
Title: Hovedsponsor
Post Type: sponsor
scope: post_meta
context: side
order: 1
*/

piklist('field', array(
  'type' => 'checkbox',
  'field' => 'smamo_main_sponsor',
  'label' => 'Hovedsponsor',
  'choices' => array(
    '1' => 'Vis som hovedsponsor'
  ),
));
