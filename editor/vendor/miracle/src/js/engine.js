
Miracle.Engine = function(scene) {
  this.scene = null;
  this.firstRun = true;
  this.worldName = 'miracle-world';
  this.init(scene);
}

Miracle.Engine.prototype = {

    init: function(scene) {
      if (!scene)
        throw 'MissingSceneParameter';
      this.scene = scene;
      this.firstRun = true;
      this.ea = {};
      this.parent = null
    },
    /**
     * Update
     */
    update: function(event) {
      if (this.firstRun) { this.rebuild(); this.firstRun=false };
      //this.parent = this.scene.parent;
      //if (this.parent) { console.log('parent', this.parent);
      //this.parent.simulate(); }
//      this.scene.parent.simulate(); 
//      var node, color, v;
//      var delta = event.delta * 0.1;
//      for(var i = 0; i < this.ea.move.length, 
//        node=this.ea.move[i]; i++) {
//        var d = node.velocity.clone().multiplyScalar(delta);
//        node.position.add(d);
//      }
//      for(var i = 0; i < this.ea.prop.length, 
//        node=this.ea.prop[i]; i++) {
//        if(!node.material) continue;
//        color=node.material.color;
//        if (!color) continue;
//        this.update_color(color, event.delta * 0.0001);
//      }
    },

    update_color: function(color, delta) {
      if (color.m_color === undefined) color.m_color={r:1,g:1,b:1};
      color.g += delta * color.m_color.g;
      color.r += delta * color.m_color.r;
      color.b += delta * color.m_color.b;
      if (color.r > 1) { color.m_color.r = -1 } 
      if (color.g > 1) { color.m_color.g = -1 } 
      if (color.b > 1) { color.m_color.b = -1 } 
      if (color.r < 0) {  color.m_color.r = 1 } 
      if (color.g < 0) {  color.m_color.g = 1 } 
      if (color.b < 0) {  color.m_color.b = 1 } 
    },

    /**
     * Reset
     * 
     */
    reset: function() {
      this.ea = {
          move: [],
          'static': [],
          prop: [],
      }
    },

    /**
     * Rebuild
     * 
     */
    rebuild: function() {
      // list solid object
      this.reset();
      this.rebuild_world();
      this.scene.traverse(function(node) {
        if (node.type != 'Mesh') return;
        if (node.mass === undefined || node.mass <= 0) {
          this.ea.prop.push(node);
          return;
        }
        if (node.velocity) {
          this.ea.move.push(node);
        } else {
          this.ea.static.push(node);
        }
      }.bind(this));
      this.scene.dirty = false;
    },
    
    toString: function() {
      var out = '[Miracle.Engine]';
      var keys = ['move', 'static', 'prop'], key;
      for (var i = 0; i < keys, key=keys[i]; i++) {
        out += '\n - ' + key + ': ' + this.ea[key].length;  
      }
      return out;
    },

    /**
     * Rebuild Solid
     * 
     */
    rebuild_solid: function() {
      var node, so = this.ea.solid;
      for(var i = 0; i < so.length, node=so[i]; i++) {
        
      }
    },

    rebuild_world: function() {
      /** On crée les limites du monde
        - 4 box entourant la bb de la scene
      */
      var hex = 0xff0000;
      var obj = this.scene.getObjectByName(this.worldName)
      if (obj) this.scene.remove(obj);
      var bbox = new THREE.BoundingBoxHelper(this.scene, hex);
      bbox.name = this.worldName;
      bbox.material.wireframe = true;
      bbox.material.visible = false;
      bbox.update();
      console.log('bb', bbox);
      this.scene.add(bbox);
    }
};