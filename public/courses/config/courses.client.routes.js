angular.module('courses').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/courses', {
                templateUrl: 'courses/views/list-courses.client.view.html'
            }).
             when('/courses/create', {
                templateUrl: 'courses/views/create-course.client.view.html'
            }).
             when('/courses/:courseId', {
                templateUrl: 'courses/views/view-course.client.view.html'
            }).
             when('/courses/:courseId/edit', {
                templateUrl: 'courses/views/edit-course.client.view.html'
            }).
            when('/students/courses', {
                templateUrl: 'courses/views/student-courses.client.view.html'
            })
    }
]);