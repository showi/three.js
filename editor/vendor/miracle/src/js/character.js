Miracle.character = {

 enum: {
     player: 0x1,
     enemy: 0x2,
 },

 factory: function(object, cfg) {
   console.log('Scene', object);
    var userData = this.userData(object);
    if (!userData.character) {
        this.init(object, cfg);
    }
  },

  init: function(object, cfg) {
    cfg = cfg || {};
    object.userData.miracle.character = {
        type : cfg.type  || this.enum.enemy,
        lvl  : cfg.lvl   || 1,
        life : cfg.life  || '100',
        life_regen_factor: 0,
        phy_def: cfg.phy_def || 10,
        phy_atk: cfg.phy_atk || 5,
        mag_def: cfg.mag_def || 0,
        mag_atk: cfg.mag_atk || 0,
        energy: 100,
        energy_loss_factor: 0.3,
        mana: 10,
        mana_regen_factor: 1
    };
    //object.material.color.set(new THREE.Color(255, 255, 0));
    console.log('OBject', object);
    object.addEventListener('die', function(event) {
      console.log('Player die', event);
    });
    object.addEventListener('collision', function(obj2, linear_velocity, angular_velocity ) {
      Miracle.character.collision(this, obj2, linear_velocity, angular_velocity);
    }.bind(object));
  },

  collision: function(object, target, linear_velocity, angular_velocity) {
    console.log('Collision', object, target);
  },

  update: function(object, event) {
    object.linearVelocity.set(10, 0, 0);
    var ud = object.userData.miracle.character;
    if (ud.life < 0) {
      ud.life = 0;;
      object.dispatchEvent(new CustomEvent('die', object))
    }
    ud.energy -= ud.energy_loss_factor * event.delta;
    if (ud.energy < 0) {
      ud.energy = 0;
      object.dispatchEvent(new CustomEvent('energy_low', object));
    }
  },

  userData: function(object) {
    if (!object.userData)
      object.userData = {};
    if (!object.userData.miracle)
      object.userData.miracle = {};
   return object.userData.miracle;
  }

};

// Miracle.Character = function(scene, cfg) {
// this.scene = null;
// this.cfg = null;
// console.log('New character scene:', scene);
// this.init(scene, cfg);
// }
//
// Miracle.Character.prototype = {
// init: function(scene, cfg) {
// this.scene = scene;
// this.cfg = cfg || {};
// if (!this.hasUserData()) {
// this.injectUserData(this.cfg);
// }
// },
// update: function(delta) {
//      
// },
// hasUserData: function() {
// if (!this.scene.userData) return false;
// if (!this.scene.userData.miracle) return false;
// if (!this.scene.userData.miracle.character) return false;
// return true;
// },
//    
// injectUserData: function(cfg) {
// var scene = this.scene;
// if (!scene.userData) scene.userData = {}
// var userData = scene.userData;
// if (!userData.miracle) userData.miracle = {};
// userData.miracle.character = {
// type: 'character',
// subtype: 'enemy' || cfg.subtype,
// };
// scene.velocity = cfg.velocity || new THREE.Vector3(1.0, 0, 0);
// scene.mass = cfg.mass || 1000;
// console.log('Miracle.Character created', scene);
// }
// };
