// Source: src/js/app.js
var app = angular.module('falcon', [])
.run(['Data', 'Overlay', 'Cache', function(Data, Overlay, Cache) {
    $(document).keyup(function(e) {
        if (e.which === 27 && Data.demoActive) {
            Overlay.closeDemo()
            .then(Overlay.close())
            .then(function() {
                Data.demoActive = false;
            }, function() {
                document.location.href = document.location.href;
            });
        }
        else if (e.which === 27 && Data.menuActive) {
            var slide = Cache.nav.find('.hover-slide');
            var indicator = slide.find('p');
            var element = $('.menu li.active');

            Cache.header.stop(true).velocity({'height': '70px'}, 200);
            Cache.mainContainer.stop(true).velocity({'top': '70px'}, 200);

            indicator.velocity({
                width: 0,
                left: (parseInt(element.position().left, 10) - parseInt(element.parent().position().left, 10)) + (element.outerWidth()/2) + 'px',
            }, 500);

            $('.menu li').removeClass('active');
            $('.tiles').removeClass('active');
            Data.menuActive = false;
        }

        // $('body').on('click', function (event) {
        //     if (!$('header.main').is(event.target) && $('header.main').has(event.target).length === 0) {
        //         // $form.removeClass('active error').stop().animate({
        //         //     'right': '-' + $form.outerWidth(true) + 'px'
        //         // }, 500);
        //         // $('body').off();
        //     }
        // });
        //
        // angular.element('body').on('click', function() {
        //     alert('hello');
        // });
    });

    if (window.location.hash.indexOf('#demo') !== -1) {
        window.location.href = '/request-demo/';
    }

}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['falcon']);
});

// Source: src/js/lib/animation/fade.js
angular.module('falcon').animation('.fade', function($window) {
  return {
    start : function(element, done) {
      $window.setTimeout(1000, function() {
        //run the animation
        //call done when the animation is complete
        done();
      });
    }
  };
});

// Source: src/js/lib/animations/fade.js
// /*globals app*/
// angular.module('falcon').animation('.fade', function() {
//   return {
//         enter : function(element, done) {
//             console.log('start');
//             done();
//         }
//     };
// });

// Source: src/js/lib/controllers/main.js
angular.module('falcon').controller('main', ['$scope', '$compile', function($scope, $compile) {
    $('section.main').focus();

    // angular.element('.mobile-menu').html($compile(angular.element('nav ul.menu').html())($scope));

    // $scope.$watch(function() {
    //
    //     $('.mobile-menu').html($('nav ul.menu').html());
    // });

    // jQuery('section.main').waypoint({
    //     context: '.feature',
    //     handler: function(direction) {
    //         console.log(direction);
    //     }
    // });

    // $.fn.waypoint.defaults = {
    //     context: $('section.main'),
    //     continuous: true,
    //     enabled: true,
    //     horizontal: false,
    //     offset: 0,
    //     triggerOnce: false
    // };

    // $('.feature').waypoint(function(direction) {
    //     console.log($(this).attr('id'));
    // }, {
    //     offset: function() {
    //         return -400;
    //     }
    // });

    // console.log('qwert');
}]);

// Source: src/js/lib/controllers/navigation.js
angular.module('falcon').controller('navigation', ['$scope', '$document', function($scope, $document) {

}]);

// Source: src/js/lib/directives/accordion.js
angular.module('falcon').directive('accordion', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            element.on('click', function() {
                element.find('.item').toggleClass('active');
            });
        }
    };
}]);

// Source: src/js/lib/directives/button.js
angular.module('falcon').directive('buttonHover', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            try {
                element.hover(function() {
                    element.data('old-background', element.css('background-color'));
                    element.data('old-border', element.css('border-color'));
                    element.data('old-text', element.css('color'));

                    element.css('background-color', attrs.background);
                    element.css('border-color', attrs.border);
                    element.css('color', attrs.text);
                }, function() {
                    element.css('background-color', element.data('old-background'));
                    element.css('border-color', element.data('old-border'));
                    element.css('color', element.data('old-text'));
                });
            } catch (err) {
                console.log(err);
            }

        }
    };
}]);

// Source: src/js/lib/directives/download.js
angular.module('falcon').directive('download', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            if (attrs.file) {
                setTimeout(function() {
                    angular.element('body').append('<iframe src="/wp-content/themes/falcon/download.php?file=' + attrs.file + '" class="file"></iframe>');
                }, attrs.start * 1000);
            }
        }
    };
}]);

// Source: src/js/lib/directives/employee.js
angular.module('falcon').directive('employee', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            var cover = element.find('.cover');
            var popupText = element.find('.popup-text');
            var name = element.find('.name');
            var position = element.find('.position');

            element.on('mouseenter', function() {
                cover.fadeIn(200);
                popupText.stop(true).velocity({
                    fontSize: '25px',
                    bottom: '160px'
                }, 200);

                name.stop(true).velocity({
                    bottom: '130px'
                }, 300);

                position.stop(true).velocity({
                    bottom: '120px'
                }, 400);
            });

            element.on('mouseleave', function() {
                cover.fadeOut(200);
                popupText.stop(true).velocity({
                    fontSize: '0',
                    bottom: '160px'
                }, 200);

                name.stop(true).velocity({
                    bottom: '60px'
                }, 300);

                position.stop(true).velocity({
                    bottom: '-20px'
                }, 400);
            });
        }
    };
}]);

// Source: src/js/lib/directives/fadein.js
// angular.module('falcon').directive('fadein', ['$animate', function($animate) {
//     return {
//         'restrict': 'A',
//         'scope': {},
//         link: function(scope, element, attrs) {
//             // console.log(attrs.fadein);
//             element.fadeTo(1.0, 'slow', function() {
//                 // console.log('done');
//             });
//         }
//     };
// }]);

// Source: src/js/lib/directives/fullscreen.js
angular.module('falcon').directive('fullscreen', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            var w = angular.element(window);

            if (element.hasClass('fullscreen')) {
                element.css('height', w.height() + 'px');

                w.resize(function() {
                    element.css('height', w.height() + 'px');
                });
            }
        }
    };
}]);

// Source: src/js/lib/directives/gravityforms.js
angular.module('falcon').directive('form', ['$document', 'Gform', function($document, Gform) {
    return {
        'restrict': 'E',
        link: function(scope, element, attrs) {
            Gform.setPlaceholderValues(element);

            $document.on('gform_post_render', function(event, form_id) {
                if (element.find('.validation_error')) {
                    var form = $document.find('#gform_wrapper_' + form_id);

                    form.addClass('error');
                    Gform.setPlaceholderValues(form);

                    if (parseInt(form.find(':selected').val(), 10) !== 0) {
                        form.find('select').addClass('valid');
                    }
                }
            });

            element.find('select').on('change', function() {
                if (parseInt(element.find(':selected').val(), 10) !== 0) {
                    element.find('select').addClass('selected');
                }
                else {
                    element.find('select').removeClass('selected');
                }
            });

            $document.on('gform_page_loaded', function(event, form_id) {
                // console.log('gform_page_loaded');
            });

            $document.on('gform_confirmation_loaded', function(event, form_id) {
                // console.log('gform_page_loaded');
            });

        }
    };
}]);

// Source: src/js/lib/directives/hover.js
angular.module('falcon').directive('hover', function() {
    return {
        'restrict': 'A',
        link: function(scope, element, attrs) {
            if (!element.hasClass('active')) {
                var imageInner = element.find('.image-inner');
                var image = element.find('img');
                var title = element.find('.title');

                element.hover(function() {
                    imageInner.stop(true).animate({backgroundColor: '#e5e5e5'}, 300);
                    title.stop(true).animate({color: '#008dff'}, 300);

                    image.stop(true).animate({
                        'height': '102%',
                        'width': '102%'
                    }, 100);
                }, function() {
                    imageInner.stop(true).animate({backgroundColor: '#f5f5f5'}, 300);
                    title.stop(true).animate({color: '#000000'}, 300);

                    image.stop(true).animate({
                        'height': '100%',
                        'width': '100%'
                    }, 100);
                });
            }
        }
    };
});

// Source: src/js/lib/directives/infobox.js
angular.module('falcon').directive('infobox', [function(){
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            console.log(element.height());
            element.css('top', '-' + (element.height() + 50) + 'px');
        }
    };
}]);

// Source: src/js/lib/directives/lazyload.js
angular.module('falcon').directive('lazyload', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            switch (element.get(0).tagName) {
                case 'IMG':
                    element.attr('src', attrs.image);
                    break;

                case 'ARTICLE':
                case 'DIV':
                case 'SECTION':
                    element.css('background', 'url(' + attrs.image + ')');
                    break;

                default:
                    break;
            }
        }
    };
}]);

// Source: src/js/lib/directives/loadmore.js
angular.module('falcon').directive('loadMore', ['Blog', function(Blog) {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            var postsOverview = angular.element('.posts');
            var page = 1;
            var posttype = attrs.posttype;

            element.on('click', function() {
                element.text('Loading...');
                Blog.get('load_more_' + attrs.posttype, {
                    'post_type': posttype,
                    'paged': ++page,
                    'tag': '',
                    'author': '',
                    'posts_per_page': 4,
                }, function(data) {
                    postsOverview.append(data);

                    element.text('Load more');
                });
            });
        }
    };
}]);

// Source: src/js/lib/directives/loadscript.js
angular.module('falcon').directive('script', [function() {
    return {
        'restrict': 'E',
        'scope': false,
        link: function(scope, element, attrs) {
            if (attrs.type === 'javascript/lazy-load' && attrs.src !== 'undefined') {
                var script = document.createElement('script');

                script.src = attrs.src;

                document.body.appendChild(script);
            }
        }
    };
}]);

// Source: src/js/lib/directives/menuitem.js
angular.module('falcon').directive('menuItem', ['Data', 'Cache', 'Overlay', function(Data, Cache, Overlay) {
    return {
        'restrict': 'A',
        link: function(scope, element, attrs) {
            try {
                var contentContainer = $('.container.content');
                var close = Cache.header.find('.close');
                var slide = Cache.nav.find('.hover-slide');
                var indicator = slide.find('p');
                var headerMainHeight = $('header.main').height();


                // var iScrollPos = 0;

                // $('section.main').scroll(function () {
                //     // var iCurScrollPos = $(this).scrollTop();
                //     // var animateTo;
                //     //
                //     // if (iCurScrollPos > iScrollPos) {
                //     //     // Cache.header.velocity({'height': '70px'}, 2000);
                //     //     // Cache.mainContainer.velocity({'top': '70px'}, 2000);
                //     //     // }
                //     //     // animateTo = 70;
                //     // } else {
                //     //     // animateTo = 140;
                //     //     // animateTo = headerMainHeight + 70 + 'px';
                //     //     // Cache.header.velocity({'height': '140px'}, 2000);
                //     //     // Cache.mainContainer.velocity({'top': '140px'}, 2000);
                //     //     // console.log('scroll up');
                //     // }
                //     // iScrollPos = iCurScrollPos;
                //
                //     // Cache.header.velocity({'height': '140px'}, 2000);
                //     // Cache.mainContainer.velocity({'top': '140px'}, 2000);
                //
                //     // Cache.header.velocity({'height': animateTo + 'px'}, 2000);
                //     // Cache.mainContainer.velocity({'top': animateTo + 'px'}, 2000);
                // });

                element.on('click', function() {
                    if (!element.hasClass('active')) {

                        var container = $('#container-' + attrs.index),
                        height = container.innerHeight() + contentContainer.offset().top + close.height() + 30;

                        if (Data.menuActive) {
                            indicator.stop(true).velocity({
                                left: (parseInt(element.find('p').position().left, 10) - parseInt(element.parent().position().left, 10)) + 'px',
                                width: element.find('p').innerWidth() + 'px'
                            }, 300);
                        }
                        else {
                            // indicator
                            // .css('left', (parseInt(element.find('p').position().left, 10) - parseInt(element.parent().position().left, 10)) + (element.find('p').innerWidth()/2) + 'px')
                            // .velocity({
                            //     width: element.find('p').innerWidth() + 'px',
                            //     left: (parseInt(element.find('p').position().left, 10) - parseInt(element.parent().position().left, 10))  + 'px',
                            // }, 300);
                        }

                        $('.menu li').removeClass('active');


                        element.addClass('active');
                        container.addClass('active');

                        var animateTo = container.hasClass('active') ? height : headerMainHeight + 'px';

                        if (height > $(window).height()) {
                            animateTo = $(window).height();
                        }

                        Cache.header.stop(true).velocity({'height': animateTo + 'px'}, 200);
                        Cache.mainContainer.stop(true).velocity({'top': animateTo + 'px'}, 200);

                        var transition = "transition.fadeIn";
                        if (Data.menuActive) {
                            transition = Data.index < attrs.index ? "transition.slideLeftIn" : "transition.slideRightIn";
                        }

                        $('.tiles').removeClass('active visible');
                        $('.tiles').velocity({ opacity: 0 }, 150);

                        container.velocity(transition, 300);
                        container.addClass('visible');

                        Data.index = attrs.index;
                        Data.menuActive = true;
                        // Overlay.open(false, 'menu');
                    }
                    else {
                        Cache.header.stop(true).velocity({'height': headerMainHeight + 'px'}, 600);
                        Cache.mainContainer.stop(true).velocity({'top': headerMainHeight + 'px'}, 600);

                        indicator.velocity({
                            width: 0,
                            left: (parseInt(element.position().left, 10) - parseInt(element.parent().position().left, 10)) + (element.outerWidth()/2) + 'px',
                        }, 300);

                        $('.tiles').velocity({ opacity: 0 }, 200);
                        $('.menu li').removeClass('active');
                        $('.tiles').removeClass('active');

                        Data.menuActive = false;
                        Overlay.close();
                    }
                });

                angular.element('.overlay').on('click', function() {
                    var element = $('.menu li.active');

                    Cache.header.stop(true).velocity({'height': headerMainHeight + 'px'}, 200);
                    Cache.mainContainer.stop(true).velocity({'top': headerMainHeight + 'px'}, 200);

                    indicator.velocity({
                        width: 0,
                        left: (parseInt(element.position().left, 10) - parseInt(element.parent().position().left, 10)) + (element.outerWidth()/2) + 'px',
                    }, 500);

                    $('.menu li').removeClass('active');
                    $('.tiles').removeClass('active');
                    Data.menuActive = false;
                    Overlay.close();
                });

                close.on('click', function() {
                    $('.menu li').removeClass('active');
                    Cache.header.stop(true).velocity({'height': headerMainHeight + 'px'}, 200);
                    Cache.mainContainer.stop(true).velocity({'top': headerMainHeight + 'px'}, 200);

                    indicator.velocity({
                        width: 0,
                        left: (parseInt(element.position().left, 10) - parseInt(element.parent().position().left, 10)) + (element.outerWidth()/2) + 'px',
                    }, 500);

                    $('.menu li').removeClass('active');
                    $('.tiles').removeClass('active');
                    Data.menuActive = false;
                    Overlay.close();
                });
            } catch (err) {
                console.log(err);
            }

        }
    };
}]);

// Source: src/js/lib/directives/overlay.js
angular.module('falcon').directive('overlay', ['Overlay', 'Data', function(Overlay, Data){
    return {
        'restrict': 'AC',
        'link': function(scope, element, attrs) {
            element.find('.close').on('click', function() {
                Overlay.closeDemo()
                .then(Overlay.close())
                .then(function() {
                    Data.demoActive = false;
                }, function() {
                    document.location.href = document.location.href;
                });
            });
        }
    };
}]);

// Source: src/js/lib/directives/requestdemo.js
angular.module('falcon').directive('requestDemo', ['Data', 'Overlay', 'Cache', function(Data, Overlay, Cache) {
    return {
        'restrict': 'AC',
        link: function(scope, element, attrs) {
            element.on('click', function() {
                Data.demoActive = true;

                if (Data.menuActive) {
                    $('header.main').stop(true).animate({'height': '70px'}, 600);
                    $('section.main').stop(true).animate({'top': '71px'}, 600);

                    Data.menuActive = false;
                }

                Overlay.open('white')
                .then(function() {
                    var container = $('.container.demo');
                    Cache.demoContent.fadeIn(2000);
                });

            });
        }
    };
}]);

// Source: src/js/lib/directives/scrollto.js
angular.module('falcon').directive('scrollto', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            var id = attrs.name.replace('#', '');
            element.next().attr('id', id);

            // angular.element('a[href$="' + id + '"]').on('click', function() {
            //     var offset = $('#' + id).offset().top;
            //
            //     $('section.main').animate({
            //         scrollTop: offset
            //     }, 1000);
            //     // console.log(element.next());
            //     // return false;
            // });
            element.remove();
        }
    };
}]);

// Source: src/js/lib/directives/setheight.js
// angular.module('falcon').directive('setheight', [function() {
//     return {
//         'restrict': 'C',
//         link: function(scope, element, attrs) {
//             alert('works');
//             element.css('height', element.height());
//         }
//     };
// }]);

// Source: src/js/lib/directives/sidemenu.js
angular.module('falcon').directive('sideMenu', ['$window', 'Cache', function($window, Cache) {
    return {
        'restrict': 'E',
        'scope': false,
        controller: function($scope, $element, $attrs) {
            $scope.getSlug = function(menuName) {
                var slug = menuName.trim()
                .replace(/[^a-z0-9-]/gi, '-')
                .replace(/^-|-$/g, '')
                .toLowerCase();

                return slug;
            };

            $scope.getDirection = function() {

            };
        },
        link: function(scope, element, attrs) {
            // var menuItem = angular.element('<li class="menu-item"></li>'),
            //     parent = element.parent(),
            //     elementLink = angular.element('<a></a>'),
            //     slug = scope.getSlug(attrs.name);
            //
            // elementLink
            //     .attr('href', '#' + slug)
            //     .text(attrs.name);
            //
            // menuItem
            //     .attr('color', attrs.color)
            //     .html(elementLink);
            //
            // parent
            //     .attr('id', slug)
            //     .attr('color', attrs.color);
            //
            // Cache.sideMenu.append(menuItem);

            // $.fn.isOnScreen = function(){
            //
            //     var win = $(window);
            //
            //     var viewport = {
            //         top : win.scrollTop(),
            //         left : win.scrollLeft()
            //     };
            //     viewport.right = viewport.left + win.width();
            //     viewport.bottom = viewport.top + win.height();
            //
            //     var bounds = this.offset();
            //     bounds.right = bounds.left + this.outerWidth();
            //     bounds.bottom = bounds.top + this.outerHeight();
            //
            //     return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            //
            // };



            // parent.waypoint(function(direction) {
            //     console.log(parent.attr('id'));
            // }, {
            //     offset: function() {
            //         return -400;
            //     }
            // });

            //
            // var sectionMain = angular.element('section.main');
            // var position = sectionMain.scrollTop();
            //
            //
            // sectionMain.bind("scroll", function() {
            //         var scroll = sectionMain.scrollTop();
            //         var elem = parent[0];
            //         var top = elem.getBoundingClientRect().top;
            //
            //         var direction = (scroll > position) ? 'down' : 'up';
            //
            //         //
            //         // if (direction === 'down') {
            //         //
            //         //     console.log('scroll down');
            //         // }
            //         // else {
            //         //     console.log('scroll up');
            //         // }
            //         // var calc = elem.getBoundingClientRect().top - elem.getBoundingClientRect().height;
            //         var calc = elem.getBoundingClientRect().top - $('header.main').height();
            //
            //         // console.log(calc);
            //         // console.log(elem.getBoundingClientRect());
            //         //
            //
            //         if (direction === 'down') {
            //             var offset = parent.height() / 2;
            //
            //             // console.log(calc+offset);
            //
            //             // if (calc-offset <= 0) {
            //             //     console.log('fire');
            //             // }
            //
            //             if (calc+offset >= elem.getBoundingClientRect().top) {
            //                 console.log('----'+parent.attr('id')+'----');
            //                 console.log('fire');
            //             }
            //         }
            //
            //         // if (direction === 'down' && calc >= 0) {
            //         //     console.log('fire: ' + parent.attr('id'));
            //         // }
            //         // else if (direction === 'up' && calc <= 0){
            //         //     console.log('fire: ' + parent.attr('id'));
            //         // }
            //         // scope.$watch(parent, function(newValue, oldValue) {
            //         //     console.log('sdsd');
            //         // });
            //         // do {
            //         //
            //         // } while ()
            //
            //         position = scroll;
            //
            // });

            // elementLink.on('click', function() {
            //     $('section.main').stop(true, true).animate({
            //         scrollTop: parent.offset().top
            //     }, 1000);
            //
            //         console.log(parent.attr('background'));
            //     return false;
            // });
        }
    };
}]);

// angular.module('falcon').directive('feature', [function() {
//     return {
//         'restrict': 'C',
//         controller: function($scope, $element, $attrs) {
//             $scope.isVisible = function(el) {
//
//                 var top = el.getBoundingClientRect().top,
//                     rect,
//                     el = el.parentNode;
//
//                 do {
//                     rect = el.getBoundingClientRect();
//                     // console.log('top: ' + top)
//                     // console.log(rect.bottom + 50)
//                     if (top <= rect.bottom - el.getBoundingClientRect().height/2 === false) {
//                         return false;
//                     }
//                         el = el.parentNode;
//                     }
//                     while (el != document.body);
//                     // Check its within the document viewport
//                     return top <= document.documentElement.clientHeight;
//             }
//         },
//         link: function(scope, element, attrs) {
//             // element.waypoint(function() {
//             //     console.log('asdadasdadad');
//             // }, {offset: 0});
//         // console.log(element);
//         // element.waypoint(function(direction) {
//         //     alert(direction);
//         // }, { offset: 35 });
//         }
//     };
// }]);

// Source: src/js/lib/directives/tilelist.js
angular.module('falcon').directive('tileList', [function() {
    return {
        'restrict': 'C',
        controller: function($scope, $element, $attrs) {
            $scope.chunk = function(arr, size) {
                var result = [];

                while (arr.length > 0) {
                    result.push(arr.splice(0, size));
                }

                return result;
            };
        },
        link: function(scope, element, attrs) {
            angular.element(window).bind('load', function() {
                var tiles = element.find('.tile'),
                    col = attrs.columns.match(/\d/g).toString(),
                    tilesArr = scope.chunk(tiles.toArray(), 12/col);

                angular.forEach(tilesArr, function(v, k) {
                    var row = angular.element(v).wrapAll('<div class="tiles-row" />');
                });

                angular.forEach(angular.element('.tiles-row'), function(v, k) {
                    var rowHeight = angular.element(v).outerHeight(true);
                    angular.element(v).find('.tile').css('height', rowHeight + 'px');
                });
            });
        }
    };
}]);

// Source: src/js/lib/directives/vitem.js
angular.module('falcon').directive('vitem', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {
            var containerHeight = element.closest('.fullscreen').height();
            var top = (element.height() - containerHeight)/2;

            // console.log(element.closest(''))

            element.css({'display': 'block', 'margin-top': top + 'px'});
            // ($('.feature-wrapper').first().find('.text').closest('.container').height()-195)/2
        }
    };
}]);

// Source: src/js/lib/factories/Blog.js
/*globals fs*/
angular.module('falcon').factory('Blog', ['$http', function($http) {
    var _get = function(action, data, callback) {
        if (action) {

            var params = {
                'action':  action
            };

            if (angular.isObject(params)) {
                angular.forEach(data, function(v, k) {
                    params[k] = v;
                });
            }

            $http.get(fs.ajax, {
                'params': params,
                'respondType': 'HTML'
            })
            .success(function(data) {
                if (angular.isFunction(callback)) {
                    callback(data);
                }
            })
            .error(function(data) {
                console.log('error');
            });
        }
    };

    return {
        get: _get
    };
}]);

// Source: src/js/lib/factories/cache.js
angular.module('falcon').factory('Cache', [function() {
    return {
        overlay: $('.overlay'),
        header: $('header.main'),
        mainContainer: $('section.main'),
        demoContent: $('.container.demo'),
        nav: $('header.main nav')
    };
}]);

// Source: src/js/lib/factories/data.js
angular.module('falcon').factory('Data', [function() {
    return {
        menuActive: false,
        demoActive: false,
        activeId: null
    };
}]);

// Source: src/js/lib/factories/gform.js
angular.module('falcon').factory('Gform', [function() {

    var _setPlaceholderValues = function (element) {
        angular.forEach(element.find('.ginput_container'), function(value, key) {
            var elem = angular.element(value),
            label = elem.closest('.gfield').find('.gfield_label');

            if (!elem.data('placeholder')) {
                elem.data('placeholder', label.text().replace('*', ' *'));
            }

            elem.find('input').attr('placeholder', elem.data('placeholder'));
        });
    };

    var _setPlaceholderFallback = function() {
        // $('[placeholder]')
        // .focus(function () {
        //     var input = $(this);
        //     if (input.val() === input.attr('placeholder')) {
        //         input.val('').removeClass('placeholder');
        //     }
        // })
        // .blur(function () {
        //     var input = $(this);
        //     if (input.val() === '' || input.val() === input.attr('placeholder')) {
        //         input.addClass('placeholder').val(input.attr('placeholder'));
        //     }
        // })
        // .blur()
        // .parents('form').submit(function () {
        //     $(this).find('[placeholder]').each(function () {
        //         var input = $(this);
        //         if (input.val() === input.attr('placeholder')) {
        //             input.val('');
        //         }
        //     });
        // });
    };

    return {
        setPlaceholderValues: _setPlaceholderValues,
        setPlaceholderFallback: _setPlaceholderFallback
    };
}]);

// Source: src/js/lib/factories/overlay.js
angular.module('falcon').factory('Overlay', ['$q', 'Cache', function($q, Cache) {
    var _open = function(color) {
        var d = $q.defer();
        try {
            Cache.overlay.css('background-color', color).fadeIn(600, function() {
                d.resolve();
            });
        }
        catch (e) {
            d.reject(e);
        }
        finally {
            return d.promise;
        }
    };

    var _close = function() {
        var d = $q.defer();
        try {
            Cache.overlay.fadeOut(1300, function() {
                d.resolve();
            });
        }
        catch (e) {
            d.reject(e);
            return d.promise;
        }
        finally {
            return d.promise;
        }
    };

    var _closeDemo = function() {
        var d = $q.defer();
        try {
            Cache.demoContent.fadeOut(300, function() {
                d.resolve();
            });
        }
        catch (e) {
            d.reject(e);
        }
        finally {
            return d.promise;
        }
    };

    return {
        open: _open,
        close: _close,
        closeDemo: _closeDemo
    };
}]);

// Source: src/js/lib/factories/testdata.js
angular.module('falcon').factory('TestData', [function() {
    return {
        get: function(count) {
            var items = [];

            for (var i=1; i <=count; i++) {
                items.push({
                    'name': 'item'+i,
                    'title': 'lorem ipsum',
                    'text': 'lorem ipsum dolar sit amet',
                    'img': 'container.jpg',
                    'link': '#'
                    });
            }

            return items;
        }
    };
}]);

// Source: src/js/support.js
angular.module('falcon').factory('Support', ['$http', function($http) {
    return {
        http: function(action, data, callback) {
            if (action) {

                var params = {
                    action: 'support_' + action
                };

                if (angular.isObject(params)) {
                    angular.forEach(data, function(v, k) {
                        params[k] = v;
                    });
                }

                $http.get(fs.ajax, {'params':params})
                .success(function(data) {
                    if (angular.isObject(data) && angular.isFunction(callback)) {
                        callback(data);
                    }
                })
                .error(function(data) {
                    // console.log(data);
                });
            }
        }
    }
}]);

angular.module('falcon').controller('IndexController', ['$scope', 'Support', function($scope, support) {
    angular.element('.search input').trigger('focus');

    support.http('all', {}, function(data) {
        $scope.popular = data.popular;
        $scope.categories = data;

        console.log(data);

        delete($scope.categories.popular);

        $scope.showAllPosts = function(index)
    {
        $scope.categories[index].limit = false;
    }
});
}]);

angular.module('falcon').controller('SingleController', ['$scope', 'Support', function($scope, support) {
    support.http('recent', {'id':$scope.post.id}, function(data) {
        $scope.recentlist = data.recentlist;
    });

    $(function(){
        //TinyMCE cleaner
        $('.container ul').find('br').remove();

        $('.rating').on('mouseover', '.star-rating', function() {
            $(this).prevAll().andSelf().addClass('starHover');
            $(this).nextAll().removeClass('starHover');
            $(this).nextAll().removeClass('active');
        });

        $('.rating').on('mouseleave', '.star-rating', function() {
            $(this).parent().find('.dd').addClass('active');
            $(this).parent().find('.star-rating').removeClass('starHover');
        });
    })
}]);

angular.module('falcon').filter('limit', function($filter) {
    return function(list, value) {
        if (value) {
            return $filter('limitTo')(list, value);
        }

        return list;
    };
});

angular.module('falcon').filter('round', function() {
    return function(input) {
        if (angular.isNumber(input)) {
            return Math.round( input * 10 ) / 10;;
        }

        return '';
    }
});

angular.module('falcon').filter('class', function() {
    return function(input,value) {
        console.log(input);
        console.log(value);
        return input;
    }
})

angular.module('falcon').directive('stars', ['Support', function(support) {
    return {
        scope: {
            "max": "=",
            "postid": "=",
        },
        restrict: "A",
        templateUrl: "/wp-content/plugins/falconsocial-support/views/templates/rating.html",
        controller: function($scope) {

            stars = function() {
                var stars = [];

                for (i = 1, value = $scope.count; i <= $scope.max; i++, value--) {
                    var val = Math.round( value * 10 ) / 10;

                    stars.push({
                        idx:i,
                        'class': val >= 1 ? 'active dd' : (val > 0 && val < 1 ? 'half' : '')
                    })
                }

                return stars;
            }

            support.http('ratings',{'id':$scope.postid}, function(data) {
                $scope.count = data.rating;
                $scope.stars = stars();
            });

            return $scope.setStars = function(index) {
                var value = ($scope.count === index && index === 1) ? 0 : index;

                support.http('rate', {'id':$scope.postid,'stars':value}, function(data) {
                    $scope.message = data.message;
                    $scope.count = data.rating;
                    $scope.stars = stars()
                });
            };
        }
    };
}]);

angular.module('falcon').directive('blogContent', [function() {
    return {
        'restrict': 'C',
        link: function(scope, element, attrs) {

            var elements = $.parseHTML(element.html()),
            matches = [],
            htmlElements = [];

            angular.forEach(elements, function(v, k) {
                var element = angular.element(v),
                match = element.text().match(/<wistia>(.*)<\/wistia>/);

                if (match) {
                    var iframe = '<div class="video-wrapper"><iframe class="video" src="http://fast.wistia.net/embed/iframe/#embedcode#?autoPlay=false&amp;videoQuality=hd-only"></iframe></div>';
                    htmlElements.push(iframe.replace('#embedcode#', match[1]));
                }
                else {
                    htmlElements.push(element[0].outerHTML);
                }
            });

            element.html(htmlElements);
        }
    };
}]);
