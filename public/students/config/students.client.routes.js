angular.module('students').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/student/courses', {
                templateUrl: 'students/views/list-courses.student.view.html'
            }).           
            when('/student/courses/:courseId', {
                templateUrl: 'students/views/view-course.student.view.html'
            })
    }
]);