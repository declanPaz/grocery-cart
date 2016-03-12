'use strict';

var app = angular.module("skuApp");

// except for confirmEdit;

app.controller("skuController", function($scope, SkuService){

	SkuService.fetch()
	.then(function(res){
		console.log("controller fetch res", res);
		var skus = res.data;
		$scope.skus = skus;
	}), function(err){
		console.log("controller fetch err", err);
	};

	$scope.addSku = function(){
		SkuService.create($scope.newSku).then(function(res){
			console.log("addSku res", res);
			$scope.skus.push(res.config.data);
		}, function(err){
			console.log("add sku err", err);
		});
	};

	$scope.removeSku = function(sku){
		console.log("at removeSky controller");
		SkuService.remove(sku)
		.then(function(res){
			var index = $scope.skus.indexOf(sku);
			$scope.skus.splice(index, 1);
		}, function(err){
			console.log("removeSku", err);
		});
	};

	$scope.editSku = function(sku){
		swal("ya sure?");
		$scope.skuToEdit = angular.copy(this.sku);
	};

	$scope.cancelEdit = function(){
		$scope.skuToEdit = false;
	};

	$scope.confirmEdit = function(){
		SkuService.edit(this.skuToEdit);

		var newObj = this.skuToEdit;

		// map through and find ID;
		//$scope.skus = 
		$scope.skus = $scope.skus.map(function(x){
			 if (x.id === newObj.id){
			 	for (var key in x) {
			 		x[key] = newObj[key];
			 	}
			 }
			 return x;	
			// console.log("sku.id", x.id);
			// console.log("ASDf", newObj);
		});

		// this below REMOVES the edited sku;
		// var index = $scope.skus.indexOf(this.SkuToEdit);
		// $scope.skus.replace(index, 1);
	};
});




