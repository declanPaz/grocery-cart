'use strict';

var app = angular.module('skuApp');

//service provides methods for fetch, create, remove, promise;



app.service("SkuService", function($http){

	this.fetch = function(){
		return $http.get("/skus");
	};

	this.create = function(newSku) {
		return $http.post("/skus", newSku);
	};

	this.remove = function(sku){
		return $http.delete(`/skus/${sku.id}`);
	};

	this.edit = function (sku) {
		return $http.put(`/skus/${sku.id}`, sku);
	}

	// not sure of the functionality below //
	// var promise = $http.get('skus');
	// promise.then(function(res){
	// 	console.log("services/promise res", res);
	// }, function(err){
	// 	console.log("services/promise err", err);
	// })
});