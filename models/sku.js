'use strict';

// requirements
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

// this file appears to be correct;


//path name
var skusFilepath = path.join(__dirname, "../data/skus.json");

// exported functions get, write, create, delete, update;
exports.get = function(cb){
	fs.readFile(skusFilepath, function(err, data){
		if(err) return cb(err);
		var skus = JSON.parse(data);
		cb(null, skus);
	});
};

exports.write = function(skus, cb){
	fs.writeFile(skusFilepath, JSON.stringify(skus), cb);
};

exports.create = function(newSku, cb){
	this.get((err, skus) => {
		if(err) return cb(err);
		newSku.id = uuid();
		skus.push(newSku);
		console.log(newSku);
		this.write(skus, function(err){
			cb(err, newSku);
		});
	});
};

exports.delete = function(id, cb){
	this.get((err, skus) => {
		var length = skus.length;
		skus = skus.filter(function(sku){
			return sku.id !== id;
		});

		if (length === skus.length){
			cb({ err: "sku not located in DB"+ "\n" });
		}
		this.write(skus, cb);
	});
};

exports.update = function(id, updatesObj, cb){
	console.log("got to exports.update");
	this.get((err, skus) => {
		var updatedSku;
		skus = skus.map(function(sku){
			if(sku.id === id){
				for (var key in updatesObj){
					sku[key] = updatesObj[key];
				}
				updatedSku = sku;
			}
			return sku;
		});
		if(!updatedSku){
			cb({err: "sku not located in DB"+ "\n" });
		}
		this.write(skus, function(err){
			cb(err, updatedSku);
		});
	});
};

