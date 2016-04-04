angular.module('clientModule').controller('clientModuleController', ['$scope',
    'Authentication',
    function ($scope, Authentication) {
        $scope.name = Authentication.user ? Authentication.user.fullName : 'Mean App';
        
        $scope.authentication = Authentication;
    }
]);