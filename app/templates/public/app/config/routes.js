(function(global){
	'use strict';

	angular.module('app')
		.config(configRouteProvider);

	function configRouteProvider($routeProvider){
		$routeProvider.when('/',{
			templateUrl: 'views/home/home.ejs'
		})
	}

	configRouteProvider.$inject=['$routeProvider'];
})(this);