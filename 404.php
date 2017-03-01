<!DOCTYPE html>
<html ng-app="GHS_mod">
<head>
    <?php wp_head(); ?>
</head>
<body>

<?php get_header(); ?>

<div id="progressBar">
    <div class="loader"></div>
</div>
<div class="panel-content">
<!--    <div class="welcome-patti">-->
<!--        <span><strong>Hey, Welcome back,</strong> it’s so great to see you again</span>-->
<!--        <ul class="breadcrumbs">-->
<!--            <li><a href="#" title=""><i class="fa fa-home"></i></a></li>-->
<!--            <li><a href="#" title="">Blank</a></li>-->
<!--        </ul>-->
<!--    </div><!-- Welcome Patti -->
    <div class="heading-sec">
        <div class="row">
            <div class="col-md-4 column">
                <div class="heading-profile">

                </div>
            </div>
            <div class="col-md-8 column">

            </div>
        </div>
    </div><!-- Heading Sec -->
    <div class="main-content-area">
        <div class="error-sec">
            <i class="fa fa-link"></i>
            <h2>404</h2>
            <span>This page doesn't exist!</span>
            <p>Sorry about that but why not check out the site anyway with one of the buttons below.</p>
            <ul class="error-btn">
                <li class="border"><a href="<?php echo site_url('/'); ?>" title="Back to previous page">GO BACK</a></li>
                <li class="fill"><a href="<?php echo site_url('/'); ?>" title="Home page">GO HOME</a></li>
            </ul>
        </div>
    </div>
</div>



<?php get_footer(); ?>

</body>
</html>