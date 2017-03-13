<?php get_header(); ?>

    <div id="progressBar">
        <div class="loader"></div>
    </div>
    <div class="panel-content">
        <div class="welcome-patti">
            <!--<span><strong>Hey, Welcome back,</strong> it’s so great to see you again</span>-->
            <ul class="breadcrumbs">
                <!--<li><a href="#" title=""><i class="fa fa-home"></i></a></li>-->
                <!--<li><a href="#" title="">Blank</a></li>-->
            </ul>
        </div><!-- Welcome Patti -->
        <div class="heading-sec">
            <div class="row">
                <div class="col-md-4 column">
                    <div class="heading-profile">
                        <!--<h2>Single Post</h2>-->
                        <!--<span>Your Sample text</span>-->
                    </div>
                </div>
                <div class="col-md-8 column">
                    <div class="top-bar-chart">
                        <div class="quick-report">
                            <div class="quick-report-infos">
                                <!--<p>My Balance</p>-->
                                <!--<h3>$54,785</h3>-->
                            </div>
                            <!--<span class="bar2">3,6,3,8,9,7,10,6,5,4,7,6,5,3</span>-->
                        </div>
                        <div class="quick-report">
                            <div class="quick-report-infos">
                                <!--<p>New orders</p>-->
                                <!--<h3>67,235</h3>-->
                            </div>
                            <!--<span class="bar">5,4,3,4,6,6,9,4,2,3,7,4</span>-->
                        </div>
                    </div><!-- Top Bar Chart -->
                </div>
            </div>
        </div><!-- Heading Sec -->
        <div class="main-content-area">
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- GHS_site -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-3479977104944029"
                 data-ad-slot="9194527655"
                 data-ad-format="auto"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            <div class="blog-single">
                <div class="blog">
                    <?php
                    if ( have_posts() ) {

	                    while ( have_posts() ) {

		                the_post();
                        $cats = get_the_category(); $cat_name = $cats[0]->name;
                    ?>
                    <script>
                        var post_id = <?php echo get_the_ID(); ?>;
                        var cat = "<?php echo $cats[0]->term_id; ?>";
                    </script>
                    <div class="blog-thumb">
                        <?php if ( has_post_thumbnail() ) { ?>
                            <img src="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'medium_large' ) ?>" style="height: 480px;"/>

                        <?php }?>
                    </div>
                    <div class="blog-info">
                        <i class="fa fa-calendar" aria-hidden="true"></i><?php the_time(' <b> F jS, Y</b> | '); ?> <i class="fa
                           <?php switch($cat_name){
                                case 'Games':
                                    echo 'fa-gamepad';
                                    break;
                                case 'News':
                                    echo 'fa-newspaper-o';
                                    break;
                                case 'Development':
                                    echo 'fa-code';
                                    break;
                                case 'Business':
                                case 'Entrepreneurship':
                                    echo 'fa-money';
                                    break;
                                case 'Portfolio':
                                case 'Reviews':
                                    echo 'fa-laptop';
                                    break;
                                case 'Youtube':
                                    echo 'fa-youtube-play';
                                    break;
                                default:
                                    echo 'fa-newspaper-o';
                                    break;
                                }
                            ?>
                            fa-1x"></i> <?php echo $cat_name; ?> | <i class="fa fa-comment" aria-hidden="true"></i> <?php echo get_comments_number(); ?>
                        <br/>
                        <h2><?php the_title(); ?></h2>
                        <p><?php the_content(); ?></p>
                        <div class="post-tags">
                            <span><i class="fa fa-tags"></i> Tags :</span>
                            <?php the_tags('<a title="" href="#">','</a>, ',''); ?>
                        </div>
                    </div>
                    <?php
	                    } // end while

                    } // end if
                    ?>
                </div>
            </div><!-- BLog Single -->

            <div ng-include="'/wp-content/themes/GHS-Theme/partials/related.html'">
            </div>

            <div class="comment-form">
                <div class="heading3">
                    <h3>Add your Comment</h3>
                    <span>Easy to Customize</span>
                </div>
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <label>
                                <i class="fa fa-user"></i>
                                <input type="text" placeholder="Name">
                            </label>
                        </div>
                        <div class="col-md-6">
                            <label>
                                <i class="fa fa-at"></i>
                                <input type="text" placeholder="Email Id">
                            </label>
                        </div>
                        <div class="col-md-12">
                            <label>
                                <i class="fa fa-pencil"></i>
                                <textarea placeholder="Your Message"></textarea>
                            </label>
                        </div>
                        <div class="col-md-12">
                            <button class="theme-btn" type="submit">POST NOW</button>
                        </div>
                    </div>
                </form>
            </div><!-- Comment Form -->
        </div>
    </div><!-- Panel Content -->
    <script type="text/javascript">
        $(document).ready(function(){

            'use strict';

            //*** Piety Mini Charts ***//
            $(function() {

                $('.bar').peity('bar', {
                    fill: ['#07bf29'],
                    height: ['40px'],
                    width: ['94px']
                });

                $('.bar2').peity('bar', {
                    fill: ['#404040'],
                    height: ['40px'],
                    width: ['94px']
                })

            });

        });

    </script>



<?php get_footer(); ?>