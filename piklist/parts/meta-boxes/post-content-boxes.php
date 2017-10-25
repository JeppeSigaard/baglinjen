<?php

/*
title: Indholdsblokke
post type: post, author, sponsor
order: 10
*/




piklist('field', array(
  'type' => 'group',
  'columns' => 12,
  'field' => 'smamo_content_blocks',
  'label' => 'Indhold',
  'add_more' => true,
  'template' => 'field',
  'fields' => array(

    array(
      'type' => 'select',
      'field' => 'type',
      'columns' => 6,
      'choices' => array(
        '0' => '(Vælg bloktype)',
        'paragraph' => 'Paragraf',
        'h2' => 'Heading 2',
        'h3' => 'Heading 3',
        'h4' => 'Heading 4',
        'blockquote' => 'Citat',
        'main-sponsor' => 'Hovesponsorer',
        'image_single' => 'Enkelt billede',
        'link_box' => 'Links til andre sider',
        'gallery' => 'Galleri',
      )
    ),

    array(
      'type' => 'textarea',
      'columns' => 12,
      'field' => 'multiline',
      'label' => 'Indhold',
      'attributes' => array(
        'rows' => 10,
        'columns' => 100,

      ),
      'conditions' => array(
        array(
          'field' => 'smamo_content_blocks:type',
          'value' => array('h2','h3','h4', 'paragraph', 'blockquote'),
        ),
      ),
    ),

    array(
      'type' => 'file',
      'columns' => 12,
      'save' => 'id',
      'label' => 'Upload billeder til galleriet',
      'field' => 'images',
      'conditions' => array(
        array(
          'field' => 'smamo_content_blocks:type',
          'value' => 'gallery',
        ),
      ),
    ),

    array(
      'type' => 'group',
      'field' => 'links',
      'add_more' => true,
      'columns' => '12',
      'conditions' => array(
        array(
          'field' => 'smamo_content_blocks:type',
          'value' => 'link_box',
        ),
      ),
      'fields' => array(
        array(
          'type' => 'text',
          'field' => 'label',
          'label' => 'Label',
          'columns' => '6',
        ),

        array(
          'type' => 'text',
          'field' => 'url',
          'label' => 'URL',
          'columns' => '6',
        ),

      ),
    ),

    array(
      'type' => 'file',
      'columns' => 12,
      'save' => 'id',
      'label' => 'Enkelt billede',
      'field' => 'image_single',
      'conditions' => array(
        array(
          'field' => 'smamo_content_blocks:type',
          'value' => 'image_single',
        ),
      ),
    ),
  ),
));
