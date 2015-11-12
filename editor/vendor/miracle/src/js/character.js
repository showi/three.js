Miracle.Character = function(scene, cfg) {
  this.scene = null;
  this.cfg = null;
  console.log('New character scene:', scene);
  this.init(scene, cfg);
}

Miracle.Character.prototype = {
    init: function(scene, cfg) {
      this.scene = scene;
      this.cfg = cfg || {};
      if (!this.hasUserData()) {
        this.injectUserData(this.cfg);
      }
    },
    update: function(delta) {
      
    },
    hasUserData: function() {
        if (!this.scene.userData) return false;
      if (!this.scene.userData.miracle) return false;
      if (!this.scene.userData.miracle.character) return false;
      return true;
    },
    
    injectUserData: function(cfg) {
      var scene = this.scene;
        if (!scene.userData) scene.userData = {}
      var userData = scene.userData;
      if (!userData.miracle) userData.miracle = {};
      userData.miracle.character = {
          type: 'character',
          subtype: 'enemy' || cfg.subtype,
      };
      scene.velocity = cfg.velocity || new THREE.Vector3(1.0, 0, 0);
      scene.mass = cfg.mass || 1000;
      console.log('Miracle.Character created', scene);
    }
};
