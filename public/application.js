var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
['ngResource','ngRoute','students','clientModule','courses']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider){
        //This explain The #!
        $locationProvider.hashPrefix('!');
    }
]);



angular.element(document).ready(function(){
   angular.bootstrap(document,[mainApplicationModuleName]); 
});