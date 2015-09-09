var VRMarkup = require('vr-markup');

var THREE = VRMarkup.THREE;
var VRObject = VRMarkup.VRObject;

document.registerElement(
  'vr-grid',
  {
    prototype: Object.create(
      VRObject.prototype, {
        createdCallback: {
          value: function() {
            var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
            var geometry = this.generateGeometry();
            this.object3D = new THREE.LineSegments( geometry, material, THREE.LinePieces );
            this.load();
          }
        },

        attributeChangedCallback: {
          value: function() {
            this.object3D.geometry = this.generateGeometry();
          }
        },

        generateGeometry: {
          value: function(size) {
            var size = parseFloat(this.getAttribute('size')) || 14;
            var density = parseFloat(this.getAttribute('density')) || 1;

            // Grid
            var density = 1;

            var geometry = new THREE.Geometry();

            for ( var i = - size; i <= size; i += density ) {

              geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
              geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

              geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
              geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

            }

            return geometry;
          }
        }
      }
    )
  }
);
