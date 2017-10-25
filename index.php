<?php

if (isset($_GET['format']) && 'json' === $_GET['format']){
  header("Content-type:application/json");
  global $wp_query;
  echo json_encode( $wp_query );
  die();
}

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><?php wp_title(' · ', true, 'right') ?></title>
  <?php wp_head(); ?>
</head>
<body>
  <?php get_template_part('svg') ?>
  <div class="wrapper" id="wrapper">
    <script>
      window.wp_settings = {
        root : "<?php echo get_bloginfo('url'); ?>",
        title : "<?php echo get_bloginfo('title'); ?>",
        description : "<?php echo get_bloginfo('description'); ?>",
        theme_uri : "<?php echo get_template_directory_uri(); ?>",
        api : "<?php echo get_rest_url(); ?>",
        server : "<?php echo (isSecure()) ? 'https://': 'http://' . $_SERVER['SERVER_NAME']; ?>",
        logo : "<?php echo wp_get_attachment_image_src( get_theme_mod('custom_logo') , 'full' )[0]; ?>",
        addresses: <?php echo json_encode(get_theme_mod('info_adresses')) ?>,
        social: <?php echo json_encode(get_theme_mod('info_social')) ?>,
      }
    </script>
    <?php while(have_posts()) : the_post(); ?>
    <h1 style="display: none;"><?php the_title(); ?></h1>
    <article style="display: none;"><?php the_content(); ?></article>
    <?php endwhile; ?>
  </div>
  <?php wp_footer(); ?>
</body>
</html>
