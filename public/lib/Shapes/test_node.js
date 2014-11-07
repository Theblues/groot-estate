function createShapes(filePath) {
    var shapes = require('./shapes.js');
    var fs = require('fs');
    var raw_data = fs.readFile(filePath, 'utf8');

    var data = JSON.parse(raw_data);

    var shape = {};
    var tabShapes = {};
    var nbBuilding = 0;
    var nbRoad = 0;
    var nbAmenity = 0;
    var nbNatural = 0;
    var j = 0;
    var somArea = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        shape = {};
        if (typeof data[i].building !== 'undefined' && data[i].building === true) {
            shape = shapes.createBuilding(data[i]);
            nbBuilding++;
            somArea += shape.getArea();
        }
        else if (typeof data[i].highway !== 'undefined') {
            shape = shapes.createRoad(data[i]);
            nbRoad++;
        }
        else if (typeof data[i].amenity !== 'undefined') {
            shape = shapes.createAmenity(data[i]);
            nbAmenity++;
        }
        else if (typeof data[i].natural !== 'undefined') {
            shape = shapes.createNatural(data[i]);
            nbNatural++;
        }
        tabShapes[j++] = shape;
    //console.log(shape.toString() /*+ "\n" + shape.toSvgPath()*/);
    }
    console.log("nbBuilding : " + nbBuilding + ", nbRoad : " + nbRoad + ", nbAmenity : " + nbAmenity + ", nbNatural : " + nbNatural);

    somArea /= nbBuilding;
    console.log("surface moyenne : " + somArea);
    return tabShapes;
}
