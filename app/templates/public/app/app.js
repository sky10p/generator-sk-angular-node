(function(global){
	angular.module('app',[
		'app.core'
		])
		.controller('appController', appController);

	function appController(){
		var vm=this;

		this.title="App";
	}
})(this);
