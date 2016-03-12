'use strict';

// requirements;
var express = require('express');
var router = express.Router();

// yes i think it's done;


// path for Sku format;
var Sku = require("../models/sku");

router.get('/', function(req, res){
	Sku.get(function(err, skus){
		if (err) return res.status(400).send(err);
		res.send(skus);
	});
});

router.get('/:id', function(req, res){
	var id = req.params.id;
	Sku.get(function(err, skus){
		if (err) return res.status(400).send(err);
		var sku = sku.find(function(obj){
			return obj.id === id;
		});
		if (!sku) return res.status(400).send({err:"sku not found"});
		res.send(sku);
	});
});

router.post("/", function (req, res){
	var newSku = req.body;
	Sku.create(newSku, function(err, savedSku){
		if(err) return res.status(400).send("post err", err);
		res.send();
	});
});

router.delete("/:id", function(req, res){
	var id = req.params.id;
	Sku.delete(id, function(err){
		if (err) return res.status(400).send("delete err", err);
		res.send();
	});
});

router.put("/:id", function(req, res){
	var id = req.params.id;
	var updatesObj = req.body;
	Sku.update(id, updatesObj, function(err, updatedSku){
		if (err) res.status(400).send("put err", err);
		res.send(updatedSku);
	});
});


module.exports = router; 

