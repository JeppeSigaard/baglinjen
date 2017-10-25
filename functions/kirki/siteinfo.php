<?php




add_action( "customize_register", "smamo_theme_customize_register" );
function smamo_theme_customize_register( $wp_customize ) {
    $wp_customize->remove_section('themes');
    $wp_customize->remove_section('static_front_page');
}
if (class_exists('Kirki')){


    Kirki::add_field( 'siteinfo', array(
        'type' => 'repeater',
        'settings' => 'info_adresses',
        'label' => 'Adresser',
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 100,
        'row_label' => array(
            'type' => 'text',
            'value' => esc_attr__('Adresse', 'my_textdomain' ),
        ),
        'fields' => array(

            'info_name' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Firmanavn', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_address' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Adresse', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_post' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Postnummer', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_by' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'By', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_email' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Email', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_telefon' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Telefonnummer', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),


            'info_cvr' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'CVR', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),
        ),

    ));

    Kirki::add_field( 'siteinfo', array(
        'type' => 'repeater',
        'settings' => 'info_social',
        'label' => 'Sociale medier',
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 100,
        'row_label' => array(
            'type' => 'text',
            'value' => esc_attr__('Medie', 'my_textdomain' ),
        ),

        'fields' => array(

            'icon' => array(
                'type'        => 'select',
                'label'       => esc_attr__( 'Ikon', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
              	'choices'     => array(
              		'facebook' => esc_attr__( 'Facebook', 'my_textdomain' ),
              		'twitter' => esc_attr__( 'Twitter', 'my_textdomain' ),
              		'youtube' => esc_attr__( 'Youtube', 'my_textdomain' ),
              		'instagram' => esc_attr__( 'Instagram', 'my_textdomain' ),
                  'podcast' => esc_attr__( 'Podcast', 'my_textdomain' ),
                  'magazine' => esc_attr__( 'Magasin', 'my_textdomain' ),
                  'newsletter' => esc_attr__( 'Nyhedsbrev', 'my_textdomain' ),
              	),
            ),

            'url' => array(
                'type'        => 'url',
                'label'       => esc_attr__( 'Link', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),
        ),

    ));
}
