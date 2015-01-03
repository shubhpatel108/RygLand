// var app = angular.module('supportApp', []);
//
// app.factory('Support', ['$http', function($http) {
// 	return {
// 		http: function(action, data, callback) {
// 			if (action) {
//
// 				// var params = {
// 					action: 'support_' + action
// 				};
//
// 				if (angular.isObject(params)) {
// 					angular.forEach(data, function(v, k) {
// 						params[k] = v;
// 					});
// 				}
//
// 				$http.get(fs.ajax, {'params':params})
// 				.success(function(data) {
// 					if (angular.isObject(data) && angular.isFunction(callback)) {
// 						callback(data);
// 					}
// 				})
// 				.error(function(data) {
// 					// console.log(data);
// 				});
// 			}
// 		}
// 	}
// }]);
//
// app.controller('IndexController', ['$scope', 'Support', function($scope, support) {
// 	angular.element('.search input').trigger('focus');
//
// 	support.http('all', {}, function(data) {
// 		$scope.popular = data.popular;
// 		$scope.categories = data;
//
// 		console.log(data);
//
// 		delete($scope.categories.popular);
//
// 		$scope.showAllPosts = function(index)
// 		{
// 			$scope.categories[index].limit = false;
// 		}
// 	});
// }]);
//
// app.controller('SingleController', ['$scope', 'Support', function($scope, support) {
// 	support.http('recent', {'id':$scope.post.id}, function(data) {
// 		$scope.recentlist = data.recentlist;
// 	});
//
// 	$(function(){
// 		//TinyMCE cleaner
// 		$('.container ul').find('br').remove();
//
// 		$('.rating').on('mouseover', '.star-rating', function() {
// 	        $(this).prevAll().andSelf().addClass('starHover');
// 	        $(this).nextAll().removeClass('starHover');
// 	        $(this).nextAll().removeClass('active');
// 		});
//
// 		$('.rating').on('mouseleave', '.star-rating', function() {
// 			$(this).parent().find('.dd').addClass('active');
// 			$(this).parent().find('.star-rating').removeClass('starHover');
// 		});
// 	})
// }]);
//
// app.filter('limit', function($filter) {
//   return function(list, value) {
//   	if (value) {
//   		return $filter('limitTo')(list, value);
//   	}
//
//   	return list;
//   };
// });
//
// app.filter('round', function() {
// 	return function(input) {
// 		if (angular.isNumber(input)) {
// 			return Math.round( input * 10 ) / 10;;
// 		}
//
// 		return '';
// 	}
// });
//
// app.filter('class', function() {
// 	return function(input,value) {
// 		console.log(input);
// 		console.log(value);
// 		return input;
// 	}
// })
//
// app.directive('stars', ['Support', function(support) {
// 	return {
// 		scope: {
// 			"max": "=",
// 			"postid": "=",
// 		},
// 		restrict: "A",
// 		templateUrl: "/wp-content/plugins/falconsocial-support/views/templates/rating.html",
// 		controller: function($scope) {
//
// 			stars = function() {
// 				var stars = [];
//
// 				for (i = 1, value = $scope.count; i <= $scope.max; i++, value--) {
// 					var val = Math.round( value * 10 ) / 10;
//
// 					stars.push({
// 						idx:i,
// 						'class': val >= 1 ? 'active dd' : (val > 0 && val < 1 ? 'half' : '')
// 					})
// 				}
//
// 				return stars;
// 			}
//
// 			support.http('ratings',{'id':$scope.postid}, function(data) {
// 				$scope.count = data.rating;
// 				$scope.stars = stars();
// 			});
//
// 			return $scope.setStars = function(index) {
// 				var value = ($scope.count === index && index === 1) ? 0 : index;
//
// 				support.http('rate', {'id':$scope.postid,'stars':value}, function(data) {
// 					$scope.message = data.message;
// 					$scope.count = data.rating;
// 					$scope.stars = stars()
// 				});
// 			};
// 		}
// 	};
// }]);
//
// app.directive('blogContent', [function() {
// 	return {
// 		'restrict': 'C',
// 		link: function(scope, element, attrs) {
//
// 			var elements = $.parseHTML(element.html()),
// 				matches = [],
// 				htmlElements = [];
//
// 			angular.forEach(elements, function(v, k) {
// 				var element = angular.element(v),
// 					match = element.text().match(/<wistia>(.*)<\/wistia>/);
//
// 				if (match) {
// 					var iframe = '<div class="video-wrapper"><iframe class="video" src="http://fast.wistia.net/embed/iframe/#embedcode#?autoPlay=false&amp;videoQuality=hd-only"></iframe></div>';
// 					htmlElements.push(iframe.replace('#embedcode#', match[1]));
// 				}
// 				else {
// 					htmlElements.push(element[0].outerHTML);
// 				}
// 			});
//
// 			element.html(htmlElements);
// 		}
// 	};
// }]);
