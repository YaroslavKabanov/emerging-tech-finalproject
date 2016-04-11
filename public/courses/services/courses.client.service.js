angular.module('courses').factory('Courses', ['$resource',
    function ($resource) {
        return $resource('api/courses/:courseId', {
            courseId: '@_id',
            
        }, {
                update: {
                    method: 'PUT'
                }
            });
    }]);


angular.module('courses').factory('CoursesByUser', ['$resource',
    function ($resource) {
        return $resource('api/courses/student/:Id', {
            Id: '@_id'
            },{
                query:{
                    isArray:true
                }            
        });
    }]);