'use strict';

angular.module('adverts').directive('mapListEstate', ['$http', 'd3', '_', '$', 'shapes',function($http, d3, _, $, shapes) {
    function doShapes(scope, element){
        var promise = $http.get('/lib/Shapes/data/eure.json', {responseType:'json'});
        promise.then(function(tabData) {
            var data = tabData.data;
            var shape = {};

            var tabShapes = [];
            var j = 0;
            var somArea = 0;

            var xMin = Infinity;
            var xMax= -Infinity;
            var yMin = Infinity;
            var yMax= -Infinity;

            for (var i = data.length - 1; i >= 0; i--) {
                shape = {};
                if (typeof data[i].building !== 'undefined' && data[i].building === true) {
                    shape = shapes.createBuilding(data[i]);
                    somArea += shape.getArea();
                }
                else if (typeof data[i].highway !== 'undefined') {
                    shape = shapes.createRoad(data[i]);
                }
                else if (typeof data[i].amenity !== 'undefined') {
                    shape = shapes.createAmenity(data[i]);
                }
                else if (typeof data[i].natural !== 'undefined') {
                    shape = shapes.createNatural(data[i]);
                }
                else if (typeof data[i].shop !== 'undefined') {
                    shape = shapes.createShop(data[i]);
                }
                if (angular.isObject(shape)) {
                    var nodes = shape.getNodes();
                    tabShapes[j++] = shape;
                    for (var k = 0; k < nodes.length; k++) {
                        xMin = nodes[k][0] < xMin ? nodes[k][0] : xMin;
                        xMax = nodes[k][0] > xMax ? nodes[k][0] : xMax;
                        yMin = nodes[k][1] < yMin ? nodes[k][1] : yMin;
                        yMax = nodes[k][1] > yMax ? nodes[k][1] : yMax;
                    }
                }
            }

            var coordiateWidth = Math.abs(xMax) + Math.abs(xMin);
            var coordiateHeight = Math.abs(yMax) + Math.abs(yMin);
            var displayWidth = coordiateWidth;
            var displayHeight = displayWidth * coordiateHeight / coordiateWidth;

            var svg = d3.select(element[0])
            .append('svg')
            .attr('data-ng-model', 'idMap')
            .attr('width', displayWidth)
            .attr('height', displayHeight)
            .attr('class', 'map')
            .append('g');

            var tabTypes = ['building', 'natural', 'amenity', 'shop', 'road'];
            shape = svg.selectAll('.shape');

            var shapesData = shape.data(tabShapes);
            shapesData.enter().append('path')
            .attr('class', function(d) {return d.getShapeType();})
            .attr('d', function(d) { return d.toSvgPath();})
            .on('mouseover', function(d){
                d3.select(this).classed('over', 1);
                if (d.getName() !== '') {
                    d3.select('.tooltip')
                    .style('left', (d3.event.pageX - 15) + 'px')
                    .style('top', (d3.event.pageY + 20) + 'px');

                    $('.name').text(d.getName());
                    $('.tooltip').removeClass('hidden');
                }
            }).on('mouseout', function(d){
                d3.select(this).classed('over', 0);
                $('.tooltip').addClass('hidden');
            }).on('click', function(d,i){
                if (d.getShapeType() === 'building') {
                    scope.addIdMap(d.getId());
                    $('.advert-modal-add').css('visibility','visible');
                }
            });
        }, function(err){console.log(err);});
    }

    return {
        restrict: 'E',
        link: doShapes
    };
}]);
