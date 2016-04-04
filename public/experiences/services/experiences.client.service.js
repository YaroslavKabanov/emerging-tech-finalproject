angular.module('experiences').factory('Experiences', ['$resource',
    function ($resource) {
        return $resource('api/experiences/:experienceId', {
            experienceId: '@_id',
            
        }, {
                update: {
                    method: 'PUT'
                }
            });
    }]);


angular.module('experiences').factory('ExperiencesByUser', ['$resource',
    function ($resource) {
        return $resource('api/experiences/student/:Id', {
            Id: '@_id'
            },{
                query:{
                    isArray:true
                }            
        });
    }]);