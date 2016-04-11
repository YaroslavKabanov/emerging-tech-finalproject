angular.module('courses').controller('CoursesController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Courses', 'CoursesByUser',
    function($scope, $routeParams, $location, Authentication, Courses, CoursesByUser) {
        $scope.authentication = Authentication;
        $scope.create = function() {
            var course = new Courses({
                courseName: this.courseName,
                courseCode: this.courseCode,
                program: this.program,
                description: this.description
            });

            course.$save(function(response) {
                $location.path('courses/' + response._id);
                //reload page to get the new value
                location.reload();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });


        };

        $scope.findAll = function() {
            $scope.courses = Courses.query();
        };

        $scope.findAllFromUser = function() {
            if (Authentication.user !== null) {
                $scope.courses = CoursesByUser.query({
                    Id: Authentication.user._id
                });
                //console.log(Authentication.user._id);
            } else {
                $scope.courses = {};

            }


        };

        $scope.findOne = function() {

            $scope.course = Courses.get({
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

        $scope.delete = function(course) {
            if (confirm("Are you sure that you want to delete this ? \nRecord will be deleted permanently")) {
                
                if (course) {
                    course.$remove(function() {
                        for (var i in $scope.courses) {
                            if ($scope.courses[i] === course) {
                                $scope.courses.splice(i, 1);
                            }
                        }
                    });
                } else {
                    $scope.course.$remove(function() {
                        $location.path('courses/');
                    });
                }
            }

        };


    }
]);