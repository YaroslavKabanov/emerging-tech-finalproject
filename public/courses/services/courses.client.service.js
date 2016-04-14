angular.module('courses').factory('Courses', ['$resource', function($resource) {
    return $resource('api/courses/:courseId', {
        courseId: '@_id'
    }, {
            update: {
                method: 'PUT'
            }
        });
}]);


angular.module('courses').factory('CourseStudent', ['$resource', function($resource) {
    return $resource('api/students/courses/:enrollmentCourseId', {
        course: '@_id'
        ,
        });
}]);

angular.module('courses').factory('Classmates', ['$resource', function($resource) {
    return $resource('api/classmate/courses/:enrollmentCourseId', {
        course: '@_id'
        ,
        });
}]);

