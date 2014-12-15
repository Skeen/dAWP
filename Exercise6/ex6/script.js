angular.module('magica', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.stars = 0;
}])
.directive('rating', function()
{
    return {
        template: function(elem, attr) {
            var stars = attr['stars'];
            var max = attr['max'];

            if((stars > max) || (stars < 0)) {
                alert("It's too full of stars!");
                return "Invalid number of stars";
            }

            // TODO: The loop should be an angularjs loop itself
            // No html hackery is needed
            var star_html = '<img src="star.jpg" height="42" width="42"/>';
         
            function repeat(str, times) {
                return new Array(times + 1).join(str);
            }

            return repeat(star_html, Number(stars));
        }
    };
});
