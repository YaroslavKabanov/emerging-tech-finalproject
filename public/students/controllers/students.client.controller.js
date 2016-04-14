angular.module('students').controller('StudentsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Students',
    function($scope, $routeParams, $location, Authentication, Students) {
        $scope.authentication = Authentication;


       


        $scope.find = function() {
            $scope.courses = Students.query();
        };

        $scope.findOne = function() {

            $scope.course = Students.get({
                courseId: $routeParams.courseId
            });

        };


        $scope.update = function() {
            $scope.course.$update(function() {
                $location.path('courses/' + $scope.course._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        

       
    }
]);


