angular.module('clientModule').config(['$routeProvider',
function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'clientModule/views/clientModule.client.view.html'
    }).
    otherwise({
       redirectTo:'/' 
    });
}
    
]);