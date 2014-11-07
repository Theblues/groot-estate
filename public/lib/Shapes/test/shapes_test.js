/*global describe,it*/
'use strict';

var blanket = require("blanket");

var assert = require('assert'),
shapes = require('../lib/shapes.js');
var should = require('chai').should();

var fs = require('fs');
var raw_data = fs.readFile('data/eure.json', 'utf8');
var data = JSON.parse(raw_data);

//blanket.options("reporter", "../node_modules/grunt-blanket-mocha/support/grunt-reporter.js");

describe('shapes node module =>', function() {
    describe('test version', function() {
        it('must be 0.0.1', function() {
            assert.equal( shapes.VERSION, '0.0.1');
        });
    });
});

describe('shapes data =>', function() {
    describe('natural num 3 =>', function() {
        var shape = shapes.createNatural(data[3]);
        describe('name', function() {
            it('must be Bassin Paul Vatine', function() {
                assert.equal(shape.getName(), 'Bassin Paul Vatine');
            });
        });
        describe('type', function() {
            it('must be water', function() {
                assert.equal(shape.getType(), 'water');
            });
        });
        describe('Function getType', function() {
            it('should be of type "function"', function() {
                shape.getType.should.be.a('function');
            });
            it('should return a the string "water" when attribute "natural"  is set accordingly', function() {
                shape.getType().should.equal('water');
            });
        });
        describe('Function toString', function() {
            it('should be of type "function"', function() {
                shape.getType.should.be.a('function');
            });
        });
    });
    describe('road num 9 =>', function() {
        describe('name', function() {
            it('must be Place Désiré Rebeuf', function() {
                var shape = shapes.createRoad(data[9]);
                assert.equal(shape.getName(), 'Place Désiré Rebeuf');
            });
        });
        describe('category', function() {
            it('must be residential', function() {
                var shape = shapes.createRoad(data[9]);
                assert.equal(shape.getCategory(), 'residential');
            });
        });
    });

    describe('building num 1 =>', function() {
        describe('area', function() {
            it('must be 3969,5', function() {
                var shape = shapes.createBuilding(data[1]);
                assert.equal(shape.getArea(), 3969.5);
            });
        });
        describe('id', function() {
            it('must not be 0', function() {
                var shape = shapes.createBuilding(data[1]);
                assert.notEqual(shape.getId(), '0');
            });
        });
    });
});
