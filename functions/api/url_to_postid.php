<?php
function smamo_url_to_postid( $url ) {
    // Try the core function
    $post_id = url_to_postid( $url );
    if ( $post_id == 0 ) {
        // Try custom post types
        $cpts = get_post_types( array(
            'public'   => true,
            '_builtin' => false
        ), 'objects', 'and' );
        // Get path from URL
        $url_parts = explode( '/', trim( $url, '/' ) );
        $url_parts = array_splice( $url_parts, 3 );
        $path = implode( '/', $url_parts );
        // Test against each CPT's rewrite slug
        foreach ( $cpts as $cpt_name => $cpt ) {
            $cpt_slug = $cpt->rewrite['slug'];
            if ( strlen( $path ) > strlen( $cpt_slug ) && substr( $path, 0, strlen( $cpt_slug ) ) == $cpt_slug ) {
                $slug = substr( $path, strlen( $cpt_slug ) );
                $query = new WP_Query( array(
                    'post_type'         => $cpt_name,
                    'name'              => $slug,
                    'posts_per_page'    => 1
                ));
                if ( is_object( $query->post ) )
                    $post_id = $query->post->ID;
            }
        }
    }
    return $post_id;
}
