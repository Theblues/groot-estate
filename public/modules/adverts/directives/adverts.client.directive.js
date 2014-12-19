'use strict';

angular.module('adverts').directive('mapListEstate', ['$http', 'd3', '$', function ($http, d3, $) {

    function doShapes(scope, element) {
        var promise = $http.get('/modules/adverts/shapes/data/eure.json', {responseType: 'json'});
        promise.then(function (tabData) {
            var data = tabData.data;
            var shape = {};
            var tabShapes = [];
            var j = 0;

            var xMin = Infinity;
            var xMax = -Infinity;
            var yMin = Infinity;
            var yMax = -Infinity;

            for (var i = data.length - 1; i >= 0; i--) {
                shape = scope.buildShape(data[i]);
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

            function zoomHandler() {
                svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
            }

            var svg = d3.select(element[0])
                .append('svg')
                .attr('width', displayWidth)
                .attr('height', displayHeight)
                .append('g')
                .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', zoomHandler));

            svg.append('rect')
                .attr('class', 'overlay')
                .attr('width', displayWidth)
                .attr('height', displayHeight);

            shape = svg.selectAll('.shape');
            var shapesData = shape.data(tabShapes);
            shapesData.enter().append('path')
                .attr('class', function (d) {
                    return d.getShapeType();
                })
                .attr('d', function (d) {
                    return d.toSvgPath();
                })
                .on('mouseover', function (d) {
                    d3.select(this).classed('over', 1);
                    if (d.getShapeType() !== 'building') {
                        if (d.getName() !== '') {
                            d3.select('.tooltip')
                                .style('left', (d3.event.pageX - 15) + 'px')
                                .style('top', (d3.event.pageY + 20) + 'px');
                            $('.name').text(d.getName());
                            $('.tooltip').removeClass('hidden');
                        }
                    }
                })
                .on('mouseout', function (d) {
                    d3.select(this).classed('over', 0);
                    $('.tooltip').addClass('hidden');
                })
                .on('click', function (d) {
                    if (d.getShapeType() === 'building') {
                        scope.closeAll();
                        $http.get('/adverts/' + d.getId()).success(function (data, status, headers, config) {
                            scope.viewBuilding.show = true;
                            scope.findOneByIdMap(data);
                        }).error(function (data, status, headers, config) {
                            scope.advert_surface = d.getArea();
                            scope.addBuilding.show = true;
                            scope.id_map = d.getId();
                        });
                    }
                });
        }, function (err) {
            console.log(err);
        });
    }

    return {
        restrict: 'E',
        link: doShapes
    };
}]);
