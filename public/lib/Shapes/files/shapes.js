if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/shapes.js'] === 'undefined'){_$jscoverage['lib/shapes.js']=[];
_$jscoverage['lib/shapes.js'].source=['(function(global) {',
'',
'    var l = require(\'lodash\');',
'',
'    function createShape(attributes) {',
'        var shape = {};',
'',
'        attributes._id = attributes._id || " ";',
'        attributes.name = attributes.name || " ";',
'        attributes.nodes = l.map(attributes.nodes, function(obj) { return [obj.x, obj.y]; }) || {};',
'',
'        shape.getNodes = function() {',
'            return attributes.nodes;',
'        };',
'',
'        shape.getId = function() {',
'            return attributes._id;',
'        };',
'',
'        shape.getName = function() {',
'            return attributes.name;',
'        };',
'',
'        shape.toSvgPath = function() {',
'            var i;',
'            var s = "M " + attributes.nodes[0][0] + " " + attributes.nodes[0][1];',
'            for (i = 1; i < attributes.nodes.length; i++){',
'                s += " L " + attributes.nodes[i][0] + " " + attributes.nodes[i][1];',
'            }',
'            return s;',
'        };',
'',
'        shape.toString = function() {',
'            var s = \'[id : \' + attributes._id + "\\n name : " + attributes.name + "\\n node : [";',
'            var i;',
'            for (i in attributes.nodes) {',
'                s += "(" + attributes.nodes[i][0] + "," + attributes.nodes[i][1] + "), ";',
'            }',
'            s += "]";',
'            return s;',
'        };',
'',
'        return shape;',
'    }',
'',
'    function createRoad(attributes) {',
'        attributes.category = attributes.highway || {};',
'',
'        var road = createShape(attributes);',
'        var superToString = road.toString;',
'',
'        road.getCategory = function() {',
'            return attributes.category;',
'        };',
'',
'        road.toString = function() {',
'            return "Road : \\n [category : " + attributes.category + "\\n" + superToString.apply(road) + "]";',
'        };',
'        return road;',
'    }',
'',
'    function createBuilding(attributes) {',
'        var building = createShape(attributes);',
'        var superToString = building.toString;',
'',
'        var nodes = building.getNodes();',
'        var i, somme = Math.abs(nodes[nodes.length-1][0] * nodes[0][1] - nodes[0][0] * nodes[nodes.length-1][1]);',
'',
'        for (i =0; i < nodes.length - 1; i++) {',
'            somme += Math.abs(nodes[i][0] * nodes[i+1][1] - nodes[i+1][0] * nodes[i][1]);',
'        }',
'        attributes.area = somme / 2;',
'',
'        building.getArea = function() {',
'            return attributes.area;',
'        };',
'',
'        building.toString = function() {',
'            return "Building : \\n [area : " + attributes.area + "\\n" + superToString.apply(building) + "]";',
'        };',
'',
'        return building;',
'    }',
'',
'    function createAmenity(attributes) {',
'        attributes.type = attributes.amenity || {};',
'',
'        var amenity = createShape(attributes);',
'        var superToString = amenity.toString;',
'',
'        amenity.getType = function() {',
'            return attributes.type;',
'        };',
'',
'        amenity.toString = function() {',
'            return "Amenity : \\n [type : " + attributes.type + "\\n" + superToString.apply(amenity) + "]";',
'        };',
'        return amenity;',
'    }',
'',
'    function createNatural(attributes) {',
'        attributes.type = attributes.natural || {};',
'',
'        var natural = createShape(attributes);',
'        var superToString = natural.toString;',
'',
'        natural.getType = function() {',
'            return attributes.type;',
'        };',
'',
'        natural.toString = function() {',
'            return "Natural : \\n [type : " + attributes.type + "\\n" + superToString.apply(natural) + "]";',
'        };',
'        return natural;',
'    }',
'',
'    // Vérifie qu\'un objet window existe',
'    /*if (typeof window !== \'undefined\' && global === window) {',
'        global.shapes = {};',
'        global.shapes.createRoad = createRoad;',
'        global.shapes.createBuilding = createBuilding;',
'        global.shapes.createAmenity = createAmenity;',
'        global.shapes.createNatural = createNatural;',
'    } else {*/',
'        global.createRoad = createRoad;',
'        global.createBuilding = createBuilding;',
'        global.createAmenity = createAmenity;',
'        global.createNatural = createNatural;',
'        global.VERSION = \'0.0.1\';',
'    //}',
'})(this);',
''];
_$jscoverage['lib/shapes.js'][63]=0;
_$jscoverage['lib/shapes.js'][1]=0;
_$jscoverage['lib/shapes.js'][64]=0;
_$jscoverage['lib/shapes.js'][3]=0;
_$jscoverage['lib/shapes.js'][66]=0;
_$jscoverage['lib/shapes.js'][8]=0;
_$jscoverage['lib/shapes.js'][6]=0;
_$jscoverage['lib/shapes.js'][5]=0;
_$jscoverage['lib/shapes.js'][70]=0;
_$jscoverage['lib/shapes.js'][10]=0;
_$jscoverage['lib/shapes.js'][10]=0;
_$jscoverage['lib/shapes.js'][9]=0;
_$jscoverage['lib/shapes.js'][72]=0;
_$jscoverage['lib/shapes.js'][17]=0;
_$jscoverage['lib/shapes.js'][16]=0;
_$jscoverage['lib/shapes.js'][13]=0;
_$jscoverage['lib/shapes.js'][12]=0;
_$jscoverage['lib/shapes.js'][79]=0;
_$jscoverage['lib/shapes.js'][24]=0;
_$jscoverage['lib/shapes.js'][21]=0;
_$jscoverage['lib/shapes.js'][20]=0;
_$jscoverage['lib/shapes.js'][82]=0;
_$jscoverage['lib/shapes.js'][25]=0;
_$jscoverage['lib/shapes.js'][62]=0;
_$jscoverage['lib/shapes.js'][36]=0;
_$jscoverage['lib/shapes.js'][33]=0;
_$jscoverage['lib/shapes.js'][30]=0;
_$jscoverage['lib/shapes.js'][34]=0;
_$jscoverage['lib/shapes.js'][26]=0;
_$jscoverage['lib/shapes.js'][28]=0;
_$jscoverage['lib/shapes.js'][35]=0;
_$jscoverage['lib/shapes.js'][27]=0;
_$jscoverage['lib/shapes.js'][92]=0;
_$jscoverage['lib/shapes.js'][40]=0;
_$jscoverage['lib/shapes.js'][39]=0;
_$jscoverage['lib/shapes.js'][37]=0;
_$jscoverage['lib/shapes.js'][96]=0;
_$jscoverage['lib/shapes.js'][52]=0;
_$jscoverage['lib/shapes.js'][46]=0;
_$jscoverage['lib/shapes.js'][43]=0;
_$jscoverage['lib/shapes.js'][50]=0;
_$jscoverage['lib/shapes.js'][47]=0;
_$jscoverage['lib/shapes.js'][49]=0;
_$jscoverage['lib/shapes.js'][102]=0;
_$jscoverage['lib/shapes.js'][57]=0;
_$jscoverage['lib/shapes.js'][53]=0;
_$jscoverage['lib/shapes.js'][56]=0;
_$jscoverage['lib/shapes.js'][105]=0;
_$jscoverage['lib/shapes.js'][59]=0;
_$jscoverage['lib/shapes.js'][108]=0;
_$jscoverage['lib/shapes.js'][75]=0;
_$jscoverage['lib/shapes.js'][67]=0;
_$jscoverage['lib/shapes.js'][74]=0;
_$jscoverage['lib/shapes.js'][69]=0;
_$jscoverage['lib/shapes.js'][112]=0;
_$jscoverage['lib/shapes.js'][86]=0;
_$jscoverage['lib/shapes.js'][78]=0;
_$jscoverage['lib/shapes.js'][85]=0;
_$jscoverage['lib/shapes.js'][114]=0;
_$jscoverage['lib/shapes.js'][91]=0;
_$jscoverage['lib/shapes.js'][89]=0;
_$jscoverage['lib/shapes.js'][88]=0;
_$jscoverage['lib/shapes.js'][125]=0;
_$jscoverage['lib/shapes.js'][98]=0;
_$jscoverage['lib/shapes.js'][95]=0;
_$jscoverage['lib/shapes.js'][101]=0;
_$jscoverage['lib/shapes.js'][104]=0;
_$jscoverage['lib/shapes.js'][107]=0;
_$jscoverage['lib/shapes.js'][111]=0;
_$jscoverage['lib/shapes.js'][126]=0;
_$jscoverage['lib/shapes.js'][127]=0;
_$jscoverage['lib/shapes.js'][128]=0;
_$jscoverage['lib/shapes.js'][129]=0;
}_$jscoverage['lib/shapes.js'][1]++;
(function(global) {

    _$jscoverage['lib/shapes.js'][3]++;
var l = require('lodash');

    _$jscoverage['lib/shapes.js'][5]++;
function createShape(attributes) {
        _$jscoverage['lib/shapes.js'][6]++;
var shape = {};

        _$jscoverage['lib/shapes.js'][8]++;
attributes._id = attributes._id || " ";
        _$jscoverage['lib/shapes.js'][9]++;
attributes.name = attributes.name || " ";
        _$jscoverage['lib/shapes.js'][10]++;
attributes.nodes = l.map(attributes.nodes, function(obj) { _$jscoverage['lib/shapes.js'][10]++;
return [obj.x, obj.y]; }) || {};

        _$jscoverage['lib/shapes.js'][12]++;
shape.getNodes = function() {
            _$jscoverage['lib/shapes.js'][13]++;
return attributes.nodes;
        };

        _$jscoverage['lib/shapes.js'][16]++;
shape.getId = function() {
            _$jscoverage['lib/shapes.js'][17]++;
return attributes._id;
        };

        _$jscoverage['lib/shapes.js'][20]++;
shape.getName = function() {
            _$jscoverage['lib/shapes.js'][21]++;
return attributes.name;
        };

        _$jscoverage['lib/shapes.js'][24]++;
shape.toSvgPath = function() {
            _$jscoverage['lib/shapes.js'][25]++;
var i;
            _$jscoverage['lib/shapes.js'][26]++;
var s = "M " + attributes.nodes[0][0] + " " + attributes.nodes[0][1];
            _$jscoverage['lib/shapes.js'][27]++;
for (i = 1; i < attributes.nodes.length; i++){
                _$jscoverage['lib/shapes.js'][28]++;
s += " L " + attributes.nodes[i][0] + " " + attributes.nodes[i][1];
            }
            _$jscoverage['lib/shapes.js'][30]++;
return s;
        };

        _$jscoverage['lib/shapes.js'][33]++;
shape.toString = function() {
            _$jscoverage['lib/shapes.js'][34]++;
var s = '[id : ' + attributes._id + "\n name : " + attributes.name + "\n node : [";
            _$jscoverage['lib/shapes.js'][35]++;
var i;
            _$jscoverage['lib/shapes.js'][36]++;
for (i in attributes.nodes) {
                _$jscoverage['lib/shapes.js'][37]++;
s += "(" + attributes.nodes[i][0] + "," + attributes.nodes[i][1] + "), ";
            }
            _$jscoverage['lib/shapes.js'][39]++;
s += "]";
            _$jscoverage['lib/shapes.js'][40]++;
return s;
        };

        _$jscoverage['lib/shapes.js'][43]++;
return shape;
    }

    _$jscoverage['lib/shapes.js'][46]++;
function createRoad(attributes) {
        _$jscoverage['lib/shapes.js'][47]++;
attributes.category = attributes.highway || {};

        _$jscoverage['lib/shapes.js'][49]++;
var road = createShape(attributes);
        _$jscoverage['lib/shapes.js'][50]++;
var superToString = road.toString;

        _$jscoverage['lib/shapes.js'][52]++;
road.getCategory = function() {
            _$jscoverage['lib/shapes.js'][53]++;
return attributes.category;
        };

        _$jscoverage['lib/shapes.js'][56]++;
road.toString = function() {
            _$jscoverage['lib/shapes.js'][57]++;
return "Road : \n [category : " + attributes.category + "\n" + superToString.apply(road) + "]";
        };
        _$jscoverage['lib/shapes.js'][59]++;
return road;
    }

    _$jscoverage['lib/shapes.js'][62]++;
function createBuilding(attributes) {
        _$jscoverage['lib/shapes.js'][63]++;
var building = createShape(attributes);
        _$jscoverage['lib/shapes.js'][64]++;
var superToString = building.toString;

        _$jscoverage['lib/shapes.js'][66]++;
var nodes = building.getNodes();
        _$jscoverage['lib/shapes.js'][67]++;
var i, somme = Math.abs(nodes[nodes.length-1][0] * nodes[0][1] - nodes[0][0] * nodes[nodes.length-1][1]);

        _$jscoverage['lib/shapes.js'][69]++;
for (i =0; i < nodes.length - 1; i++) {
            _$jscoverage['lib/shapes.js'][70]++;
somme += Math.abs(nodes[i][0] * nodes[i+1][1] - nodes[i+1][0] * nodes[i][1]);
        }
        _$jscoverage['lib/shapes.js'][72]++;
attributes.area = somme / 2;

        _$jscoverage['lib/shapes.js'][74]++;
building.getArea = function() {
            _$jscoverage['lib/shapes.js'][75]++;
return attributes.area;
        };

        _$jscoverage['lib/shapes.js'][78]++;
building.toString = function() {
            _$jscoverage['lib/shapes.js'][79]++;
return "Building : \n [area : " + attributes.area + "\n" + superToString.apply(building) + "]";
        };

        _$jscoverage['lib/shapes.js'][82]++;
return building;
    }

    _$jscoverage['lib/shapes.js'][85]++;
function createAmenity(attributes) {
        _$jscoverage['lib/shapes.js'][86]++;
attributes.type = attributes.amenity || {};

        _$jscoverage['lib/shapes.js'][88]++;
var amenity = createShape(attributes);
        _$jscoverage['lib/shapes.js'][89]++;
var superToString = amenity.toString;

        _$jscoverage['lib/shapes.js'][91]++;
amenity.getType = function() {
            _$jscoverage['lib/shapes.js'][92]++;
return attributes.type;
        };

        _$jscoverage['lib/shapes.js'][95]++;
amenity.toString = function() {
            _$jscoverage['lib/shapes.js'][96]++;
return "Amenity : \n [type : " + attributes.type + "\n" + superToString.apply(amenity) + "]";
        };
        _$jscoverage['lib/shapes.js'][98]++;
return amenity;
    }

    _$jscoverage['lib/shapes.js'][101]++;
function createNatural(attributes) {
        _$jscoverage['lib/shapes.js'][102]++;
attributes.type = attributes.natural || {};

        _$jscoverage['lib/shapes.js'][104]++;
var natural = createShape(attributes);
        _$jscoverage['lib/shapes.js'][105]++;
var superToString = natural.toString;

        _$jscoverage['lib/shapes.js'][107]++;
natural.getType = function() {
            _$jscoverage['lib/shapes.js'][108]++;
return attributes.type;
        };

        _$jscoverage['lib/shapes.js'][111]++;
natural.toString = function() {
            _$jscoverage['lib/shapes.js'][112]++;
return "Natural : \n [type : " + attributes.type + "\n" + superToString.apply(natural) + "]";
        };
        _$jscoverage['lib/shapes.js'][114]++;
return natural;
    }

    // Vérifie qu'un objet window existe
    /*if (typeof window !== 'undefined' && global === window) {
        global.shapes = {};
        global.shapes.createRoad = createRoad;
        global.shapes.createBuilding = createBuilding;
        global.shapes.createAmenity = createAmenity;
        global.shapes.createNatural = createNatural;
    } else {*/
        _$jscoverage['lib/shapes.js'][125]++;
global.createRoad = createRoad;
        _$jscoverage['lib/shapes.js'][126]++;
global.createBuilding = createBuilding;
        _$jscoverage['lib/shapes.js'][127]++;
global.createAmenity = createAmenity;
        _$jscoverage['lib/shapes.js'][128]++;
global.createNatural = createNatural;
        _$jscoverage['lib/shapes.js'][129]++;
global.VERSION = '0.0.1';
    //}
})(this);
