<?php

add_action('init', 'smamo_clean_defaults');
function smamo_clean_defaults() {
    // Post
    remove_post_type_support('post', 'custom-fields');
    remove_post_type_support('post', 'editor');
    remove_post_type_support('post', 'excerpt');
    remove_post_type_support('post', 'revisions');

    //Page
    remove_post_type_support('page', 'custom-fields');

    // Terms
    unregister_taxonomy_for_object_type( 'post_tag', 'post' );
}
