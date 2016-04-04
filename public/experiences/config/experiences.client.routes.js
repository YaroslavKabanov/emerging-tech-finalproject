angular.module('experiences').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/experiences', {
                templateUrl: 'experiences/views/list-experiences.client.view.html'
            }).
             when('/experiences/create', {
                templateUrl: 'experiences/views/create-experiences.client.view.html'
            }).
             when('/experiences/:experienceId', {
                templateUrl: 'experiences/views/view-experiences.client.view.html'
            }).
             when('/experiences/:experienceId/edit', {
                templateUrl: 'experiences/views/edit-experiences.client.view.html'
            })
    }
]);