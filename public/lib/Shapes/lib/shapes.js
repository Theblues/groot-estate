(function(global) {
    function createShape(attributes) {
        var shape = {};

        attributes._id = attributes._id || '';
        attributes.name = attributes.name || '';
        attributes.nodes = _.map(attributes.nodes, function(obj) { return [obj.x, obj.y]; }) || {};

        shape.getNodes = function() {
            return attributes.nodes;
        };

        shape.getId = function() {
            return attributes._id;
        };

        shape.getName = function() {
            return attributes.name;
        };

        shape.toSvgPath = function() {
            var i;
            var s = "M " + attributes.nodes[0][0] + "," + attributes.nodes[0][1];
            for (i = 1; i < attributes.nodes.length; i++){
                s += " L " + attributes.nodes[i][0] + "," + attributes.nodes[i][1];
            }
            return s;
        };

        shape.toString = function() {
            var s = '[id : ' + attributes._id + "\n name : " + attributes.name + "\n node : [";
            var i;
            for (i in attributes.nodes) {
                s += "(" + attributes.nodes[i][0] + "," + attributes.nodes[i][1] + "), ";
            }
            s += "]";
            return s;
        };

        return shape;
    }

    function createRoad(attributes) {
        attributes.category = attributes.highway || {};

        var road = createShape(attributes);
        var superToString = road.toString;
        attributes.shapeType = 'road';

        road.getShapeType = function() {
            return attributes.shapeType;
        };
        road.getCategory = function() {
            return attributes.category;
        };
		
        return road;
    }

    function createBuilding(attributes) {
        var building = createShape(attributes);
        var superToString = building.toString;

        var nodes = building.getNodes();
        var i, somme = Math.abs(nodes[nodes.length-1][0] * nodes[0][1] - nodes[0][0] * nodes[nodes.length-1][1]);

        for (i =0; i < nodes.length - 1; i++) {
            somme += Math.abs(nodes[i][0] * nodes[i+1][1] - nodes[i+1][0] * nodes[i][1]);
        }
        attributes.area = somme / 2;
        attributes.shapeType = 'building';

        building.getShapeType = function() {
            return attributes.shapeType;
        };
        building.getArea = function() {
            return attributes.area;
        };

        return building;
    }

    function createAmenity(attributes) {
        attributes.type = attributes.amenity || {};

        var amenity = createShape(attributes);
        var superToString = amenity.toString;

        attributes.shapeType = 'amenity';

        amenity.getShapeType = function() {
            return attributes.shapeType;
        };
        amenity.getType = function() {
            return attributes.type;
        };

        return amenity;
    }

    function createNatural(attributes) {
        attributes.type = attributes.natural || {};

        var natural = createShape(attributes);
        var superToString = natural.toString;
        attributes.shapeType = 'natural';

        natural.getShapeType = function() {
            return attributes.shapeType;
        };
        natural.getType = function() {
            return attributes.type;
        };

        return natural;
    }

    function createShop(attributes) {
        attributes.type = attributes.shop || {};

        var shop = createShape(attributes);
        var superToString = shop.toString;
        attributes.shapeType = 'shop';

        shop.getShapeType = function() {
            return attributes.shapeType;
        };
        shop.getType = function() {
            return attributes.type;
        };

        return shop;
    }

    if(typeof process === 'object' && process + '' === '[object process]'){
        global.createRoad = createRoad;
        global.createBuilding = createBuilding;
        global.createAmenity = createAmenity;
        global.createNatural = createNatural;
        global.createShop = createShop;
        global.VERSION = '0.0.1';
    } else {
        global.shapes = {};
        global.shapes.createRoad = createRoad;
        global.shapes.createBuilding = createBuilding;
        global.shapes.createAmenity = createAmenity;
        global.shapes.createNatural = createNatural;
        global.shapes.createShop = createShop;
        global.shapes.VERSION = '0.0.1';
    }

})(this);
