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


angular.module('courses').factory('EnrollingStudent', ['$resource', function($resource) {
    return $resource('api/courses/enrollment/:courseObjectId', {
        courseObjectId: '@_id'
    });
}]);


angular.module('courses').factory('UpdateRoute', ['$resource', function($resource) {
    return $resource('api/records/:recordID', null,
        {
            'update': { method: 'PUT' }
        });
}]);


angular.module('courses').factory('StudentsByCourse', ['$resource', function($resource) {
    return $resource('api/staff/students/course/:courseId', null);
}]);

angular.module('courses').factory('EnrollmentsByStudent', ['$resource', function($resource) {
    return $resource('api/students/enrollment/:studentObjectId', null);
}]);

