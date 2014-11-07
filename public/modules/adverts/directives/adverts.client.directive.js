'use strict';

angular.module('adverts').directive('mapListEstate', ['$http', 'd3', '_', 'shapes',function($http, d3, _, shapes) {
    console.log('test');

    function doShapes(scope, element){
        var promise = $http.get('/lib/Shapes/data/eure.json', {responseType:'json'});
        promise.then(function(tabData) {
            var data = tabData.data;
            var shape = {};

            var tabBuilding = [];
            var tabNatural = [];
            var tabAmenity = [];
            var tabRoad = [];
            var tabShop = [];

            var nbBuilding = 0;
            var nbRoad = 0;
            var nbAmenity = 0;
            var nbNatural = 0;
            var nbShop = 0;

            var somArea = 0;

            var xMin = Infinity;
            var xMax= -Infinity;
            var yMin = Infinity;
            var yMax= -Infinity;

            for (var i = data.length - 1; i >= 0; i--) {
                shape = {};
                if (typeof data[i].building !== 'undefined' && data[i].building === true) {
                    shape = shapes.createBuilding(data[i]);
                    tabBuilding[nbBuilding++] = shape;
                    somArea += shape.getArea();
                }
                else if (typeof data[i].highway !== 'undefined') {
                    shape = shapes.createRoad(data[i]);
                    tabRoad[nbRoad++] = shape;
                }
                else if (typeof data[i].amenity !== 'undefined') {
                    shape = shapes.createAmenity(data[i]);
                    tabAmenity[nbAmenity++] = shape;
                }
                else if (typeof data[i].natural !== 'undefined') {
                    shape = shapes.createNatural(data[i]);
                    tabNatural[nbNatural++] = shape;
                }
                else if (typeof data[i].shop !== 'undefined') {
                    shape = shapes.createShop(data[i]);
                    tabShop[nbShop++] = shape;
                }
                if (angular.isObject(shape)) {
                    var nodes = shape.getNodes();
                    for (var k = 0; k < nodes.length; k++) {
                        xMin = nodes[k][0] < xMin ? nodes[k][0] : xMin;
                        xMax = nodes[k][0] > xMax ? nodes[k][0] : xMax;
                        yMin = nodes[k][1] < yMin ? nodes[k][1] : yMin;
                        yMax = nodes[k][1] > yMax ? nodes[k][1] : yMax;
                    }
                }
            }

            var coordiateWidth = Math.abs(xMax+xMin);
            var coordiateHeight = Math.abs(yMax+yMin);
            //console.log(angular.element('.container'));
            var displayWidth = $('.container').width();
            var displayHeight = displayWidth * coordiateHeight / coordiateWidth;

            var svg = d3.select(element[0])
            .append('svg')
            .attr('width', displayWidth)
            .attr('height', displayHeight)
            .attr('class', 'map')
            .append('g');

            var tabTypes = ['building', 'natural', 'amenity', 'shop', 'road'];
            shape = svg.selectAll('.shape');

            for(i = 0; i < tabTypes.length; i++){
                var shapeData = {};
                if (tabTypes[i] === 'building') {
                    shapeData = shape.data(tabBuilding);
                }
                else if (tabTypes[i] === 'natural') {
                    shapeData = shape.data(tabNatural);
                }
                else if (tabTypes[i] === 'amenity') {
                    shapeData = shape.data(tabAmenity);
                }
                else if (tabTypes[i] === 'shop') {
                    shapeData = shape.data(tabShop);
                }
                else if (tabTypes[i] === 'road') {
                    shapeData = shape.data(tabRoad);
                }

                shapeData.enter().append('path').classed(tabTypes[i], 1)
                .attr('d', function(d) {
                    return d.toSvgPath();
                }).on('mouseover', function(d){
                    d3.select(this).classed('over', 1);

                    if (d.getName() !== '') {
                        d3.select('.tooltip')
                        .style('left', (d3.event.pageX - 15) + 'px')
                        .style('top', (d3.event.pageY + 20) + 'px')
                        .select('.name').text(d.getName());

                        d3.select('.tooltip').classed('hidden', 0);
                    }
                }).on('mouseout', function(d){
                    d3.select(this).classed('over', 0);
                    d3.select('.tooltip').classed('hidden', 1);
                }).on('click', function(d,i){
                    d3.select('.editForm')
                    .style('left', $('.map').position().left + 150 + 'px')
                    .style('top', $('.map').position().top + 'px');

                    d3.select('.editForm').classed('hidden', 0);
                });
            }
        }, function(err){console.log(err);});
    }

    return {
        restrict: 'E',
        link: doShapes
    };
}]);
