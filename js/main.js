/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */

/**
 * Configure the Routes
 */
var app = angular.module('tutorialWebApp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        .when("/dashboard-2", {templateUrl: "partials/home2.html", controller: "PageCtrl"})
        .when("/dashboard-3", {templateUrl: "partials/home3.html", controller: "PageCtrl"})
        .when("/pages/blank", {templateUrl: "partials/pages/blank.html", controller: "PageCtrl"})
        .when("/pages/inbox", {templateUrl: "partials/pages/inbox.html", controller: "PageCtrl"})
        .when("/pages/compose", {templateUrl: "partials/pages/compose.html", controller: "PageCtrl"})
        .when("/pages/widgets", {templateUrl: "partials/pages/widgets.html", controller: "PageCtrl"})
        .when("/pages/font-awesome", {templateUrl: "partials/pages/font-awesome.html", controller: "PageCtrl"})
        .when("/pages/themify-icons", {templateUrl: "partials/pages/themify-icons.html", controller: "PageCtrl"})
        .when("/pages/rich-charts", {templateUrl: "partials/pages/charts.html", controller: "PageCtrl"})
        .when("/pages/blog", {templateUrl: "partials/pages/blog.html", controller: "PageCtrl"})
        .when("/pages/single-post", {templateUrl: "partials/pages/single-post.html", controller: "PageCtrl"})
        .when("/pages/404", {templateUrl: "partials/pages/404.html", controller: "PageCtrl"})
        .when("/pages/505", {templateUrl: "partials/pages/505.html", controller: "PageCtrl"})
        .when("/pages/contact", {templateUrl: "partials/pages/contact.html", controller: "ContactCtrl"})
        .when("/pages/google-map", {templateUrl: "partials/pages/google-map.html", controller: "GoogleCtrl"})
        .when("/pages/vector-map", {templateUrl: "partials/pages/vector-map.html", controller: "PageCtrl"})
        .when("/pages/invoice", {templateUrl: "partials/pages/invoice.html", controller: "PageCtrl"})
        .when("/pages/search-not-found", {templateUrl: "partials/pages/search.html", controller: "PageCtrl"})
        .when("/pages/search-found", {templateUrl: "partials/pages/search-found.html", controller: "PageCtrl"})
        .when("/pages/faq", {templateUrl: "partials/pages/faq.html", controller: "PageCtrl"})
        .when("/pages/reset-password", {templateUrl: "partials/pages/reset-password.html", controller: "PageCtrl"})
        .when("/pages/our-team", {templateUrl: "partials/pages/team.html", controller: "PageCtrl"})
        .when("/pages/our-team2", {templateUrl: "partials/pages/team2.html", controller: "PageCtrl"})
        .when("/pages/scroll-box", {templateUrl: "partials/pages/scroll-box.html", controller: "PageCtrl"})
        .when("/pages/services", {templateUrl: "partials/pages/services.html", controller: "PageCtrl"})
        .when("/pages/services2", {templateUrl: "partials/pages/services2.html", controller: "PageCtrl"})
        .when("/pages/services3", {templateUrl: "partials/pages/services3.html", controller: "PageCtrl"})
        .when("/pages/portfolio", {templateUrl: "partials/pages/portfolio.html", controller: "PageCtrl"})
        .when("/pages/portfolio2", {templateUrl: "partials/pages/portfolio2.html", controller: "PageCtrl"})
        .when("/pages/profile", {templateUrl: "partials/pages/profile.html", controller: "PageCtrl"})
        .when("/pages/buttons", {templateUrl: "partials/pages/button.html", controller: "PageCtrl"})
        .when("/pages/timeline", {templateUrl: "partials/pages/timeline.html", controller: "PageCtrl"})
        .when("/pages/typography", {templateUrl: "partials/pages/typography.html", controller: "PageCtrl"})
        .when("/pages/calendar", {templateUrl: "partials/pages/calendar.html", controller: "PageCtrl"})
        .when("/pages/upload-crop", {templateUrl: "partials/pages/upload-crop.html", controller: "CropCtrl"})
        .when("/pages/tour", {templateUrl: "partials/pages/tour.html", controller: "PageCtrl"})
        .when("/pages/collapse", {templateUrl: "partials/pages/collapse.html", controller: "PageCtrl"})
        .when("/pages/forms", {templateUrl: "partials/pages/forms.html", controller: "PageCtrl"})
        .when("/pages/grids", {templateUrl: "partials/pages/grids.html", controller: "PageCtrl"})
        .when("/pages/notification", {templateUrl: "partials/pages/notification.html", controller: "PageCtrl"})
        .when("/pages/price-table", {templateUrl: "partials/pages/price-table.html", controller: "PageCtrl"})
        .when("/pages/price-table2", {templateUrl: "partials/pages/price-table2.html", controller: "PageCtrl"})
        .when("/pages/range-slider", {templateUrl: "partials/pages/range-slider.html", controller: "PageCtrl"})
        .when("/pages/sort-block", {templateUrl: "partials/pages/sort-block.html", controller: "PageCtrl"})
        .when("/pages/basic-tables", {templateUrl: "partials/pages/basic-tables.html", controller: "PageCtrl"})
        .when("/pages/tabular-table", {templateUrl: "partials/pages/tabular-tables.html", controller: "PageCtrl"})
        .when("/pages/task-dynamic", {templateUrl: "partials/pages/task-dynamic.html", controller: "PageCtrl"})
        .when("/pages/task-simple", {templateUrl: "partials/pages/task-simple.html", controller: "PageCtrl"})
        .when("/pages/progress-bar", {templateUrl: "partials/pages/progress-bar.html", controller: "PageCtrl"})
        .when("/pages/popovers", {templateUrl: "partials/pages/popovers.html", controller: "PageCtrl"})
        .when("/pages/navbars", {templateUrl: "partials/pages/nav-bar.html", controller: "PageCtrl"})
        .when("/pages/calculator", {templateUrl: "partials/pages/calculator.html", controller: "PageCtrl"})
        .when("/pages/paginations", {templateUrl: "partials/pages/pagination.html", controller: "PageCtrl"})
        .when("/pages/tooltips", {templateUrl: "partials/pages/tooltips.html", controller: "PageCtrl"})
        .when("/pages/ribbon-grids", {templateUrl: "partials/pages/ribbon-grids.html", controller: "PageCtrl"})
        .when("/pages/css-spinners", {templateUrl: "partials/pages/css-spinners.html", controller: "PageCtrl"})
        .when("/pages/gallery", {templateUrl: "partials/pages/gallery.html", controller: "PageCtrl"})
        .when("/pages/gallery2", {templateUrl: "partials/pages/gallery2.html", controller: "PageCtrl"})
        .when("/pages/order-received", {templateUrl: "partials/pages/order-received.html", controller: "PageCtrl"})
        .when("/pages/forgot-password", {templateUrl: "partials/pages/forgot-password.html", controller: "PageCtrl"})
        .when("/pages/login", {templateUrl: "partials/pages/login.html", controller: "PageCtrl"})
        .when("/pages/checkout", {templateUrl: "partials/pages/checkout.html", controller: "PageCtrl"})
        .when("/pages/product", {templateUrl: "partials/pages/product.html", controller: "PageCtrl"})
        .when("/pages/product2", {templateUrl: "partials/pages/product2.html", controller: "PageCtrl"})
        .when("/pages/cart", {templateUrl: "partials/pages/cart.html", controller: "PageCtrl"})
        .when("/pages/single-product", {templateUrl: "partials/pages/single-product.html", controller: "PageCtrl"})
        .when("/pages/signup", {templateUrl: "partials/pages/signup.html", controller: "PageCtrl"})
        .when("/pages/lockscreen", {templateUrl: "partials/pages/lockscreen.html", controller: "PageCtrl"})

        // else 404
        .otherwise({
            redirectTo: '/pages/404'
        })

}]).// Google Map Controller
controller('CropCtrl', ['$scope', '$location', function ($scope, $location) {

    $(document).scrollTop(0);

    var loaded = 0;
    var imgCounter = $(".main-content img").length;
    if (imgCounter > 0) {
        console.log(imgCounter);

        function doProgress() {
            $(".main-content img").load(function () {
                loaded++;
                var newWidthPercentage = (loaded / imgCounter) * 100;
                animateLoader(newWidthPercentage + '%');
            })
        }

        function animateLoader(newWidth) {
            $("#progressBar").width(newWidth);
            if (imgCounter === loaded) {
                setTimeout(function () {
                    $("#progressBar").animate({opacity: 0});
                }, 500);
            }
        }

        doProgress();
    } else {
        setTimeout(function () {
            $("#progressBar").css({
                "opacity": 0,
                "width": "100%"
            });
        }, 500);
    }


    // convert bytes into friendly format
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    // check for selected crop region
    function checkForm() {
        if (parseInt($('#w').val())) return true;
        $('.error').html('Please select a crop region and then press Upload').show();
        return false;
    };

    // update info by cropping (onChange and onSelect events handler)
    function updateInfo(e) {
        $('#x1').val(e.x);
        $('#y1').val(e.y);
        $('#x2').val(e.x2);
        $('#y2').val(e.y2);
        $('#w').val(e.w);
        $('#h').val(e.h);
    };

    // clear info by cropping (onRelease event handler)
    function clearInfo() {
        $('.info #w').val('');
        $('.info #h').val('');
    };

    function fileSelectHandler() {

        // get selected file
        var oFile = $('#image_file')[0].files[0];

        // hide all errors
        $('.error').hide();

        // check for image type (jpg and png are allowed)
        var rFilter = /^(image\/jpeg|image\/png)$/i;
        if (!rFilter.test(oFile.type)) {
            $('.error').html('Please select a valid image file (jpg and png are allowed)').show();
            return;
        }

        // check for file size
        if (oFile.size > 250 * 1024) {
            $('.error').html('You have selected too big file, please select a one smaller image file').show();
            return;
        }

        // preview element
        var oImage = document.getElementById('preview');

        // prepare HTML5 FileReader
        var oReader = new FileReader();
        oReader.onload = function (e) {

            // e.target.result contains the DataURL which we can use as a source of the image
            oImage.src = e.target.result;
            oImage.onload = function () { // onload event handler

                // display step 2
                $('.step2').fadeIn(500);

                // display some basic image info
                var sResultFileSize = bytesToSize(oFile.size);
                $('#filesize').val(sResultFileSize);
                $('#filetype').val(oFile.type);
                $('#filedim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);

                // Create variables (in this scope) to hold the Jcrop API and image size
                var jcrop_api, boundx, boundy;

                // destroy Jcrop if it is existed
                if (typeof jcrop_api != 'undefined')
                    jcrop_api.destroy();

                // initialize Jcrop
                $('#preview').Jcrop({
                    minSize: [32, 32], // min crop size
                    aspectRatio: 1, // keep aspect ratio 1:1
                    bgFade: true, // use fade effect
                    bgOpacity: .3, // fade opacity
                    onChange: updateInfo,
                    onSelect: updateInfo,
                    onRelease: clearInfo
                }, function () {

                    // use the Jcrop API to get the real image size
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];

                    // Store the Jcrop API in the jcrop_api variable
                    jcrop_api = this;
                });
            };
        };

        // read selected file as DataURL
        oReader.readAsDataURL(oFile);
    }

}]).// Google Map Controller
controller('GoogleCtrl', ['$scope', '$location', function ($scope, $location) {

    $(document).scrollTop(0);

    $scope.mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(41.923, 12.513),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('maptwo'), $scope.mapOptions);

    var loaded = 0;
    var imgCounter = $(".main-content img").length;
    if (imgCounter > 0) {
        console.log(imgCounter);

        function doProgress() {
            $(".main-content img").load(function () {
                loaded++;
                var newWidthPercentage = (loaded / imgCounter) * 100;
                animateLoader(newWidthPercentage + '%');
            })
        }

        function animateLoader(newWidth) {
            $("#progressBar").width(newWidth);
            if (imgCounter === loaded) {
                setTimeout(function () {
                    $("#progressBar").animate({opacity: 0});
                }, 500);
            }
        }

        doProgress();
    } else {
        setTimeout(function () {
            $("#progressBar").css({
                "opacity": 0,
                "width": "100%"
            });
        }, 500);
    }

}]).// Google Map Controller
controller('ContactCtrl', ['$scope', '$location', function ($scope, $location) {

    $(document).scrollTop(0);

    $scope.mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(41.923, 12.513),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

    var loaded = 0;
    var imgCounter = $(".main-content img").length;
    if (imgCounter > 0) {
        console.log(imgCounter);

        function doProgress() {
            $(".main-content img").load(function () {
                loaded++;
                var newWidthPercentage = (loaded / imgCounter) * 100;
                animateLoader(newWidthPercentage + '%');
            })
        }

        function animateLoader(newWidth) {
            $("#progressBar").width(newWidth);
            if (imgCounter === loaded) {
                setTimeout(function () {
                    $("#progressBar").animate({opacity: 0});
                }, 500);
            }
        }

        doProgress();
    } else {
        setTimeout(function () {
            $("#progressBar").css({
                "opacity": 0,
                "width": "100%"
            });
        }, 500);
    }

}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/*$scope, $location, $http*/) {

    $(document).scrollTop(0);

    var loaded = 0;
    var imgCounter = $(".main-content img").length;
    if (imgCounter > 0) {
        console.log(imgCounter);

        function doProgress() {
            $(".main-content img").load(function () {
                loaded++;
                var newWidthPercentage = (loaded / imgCounter) * 100;
                animateLoader(newWidthPercentage + '%');
            })
        }

        function animateLoader(newWidth) {
            $("#progressBar").width(newWidth);
            if (imgCounter === loaded) {
                setTimeout(function () {
                    $("#progressBar").animate({opacity: 0});
                }, 500);
            }
        }

        doProgress();
    } else {
        setTimeout(function () {
            $("#progressBar").css({
                "opacity": 0,
                "width": "100%"
            });
        }, 500);
    }

    // Activates Tooltips for Social Links
    $('[data-toggle="tooltip"]').tooltip();

    // Activates Popovers for Social Links 
    $('[data-toggle="popover"]').popover();

    //*** Refresh Content ***//
    $('.refresh-content').on("click", function () {
        $(this).parent().parent().addClass("loading-wait").delay(3000).queue(function (next) {
            $(this).removeClass("loading-wait");
            next();
        });
        $(this).addClass("fa-spin").delay(3000).queue(function (next) {
            $(this).removeClass("fa-spin");
            next();
        });
    });

    //*** Expand Content ***//
    $('.expand-content').on("click", function () {
        $(this).parent().parent().toggleClass("expand-this");
    });

    //*** Delete Content ***//
    $('.close-content').on("click", function () {
        $(this).parent().parent().slideUp();
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    });

});



  