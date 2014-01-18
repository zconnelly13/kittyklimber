ig.module(
    'game.entities.kitty'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityKitty = ig.Entity.extend({
        size: {x:58, y:64},
        collides: ig.Entity.COLLIDES.PASSIVE,
        zIndex: 2,
        classType: 'EntityKitty',

        energy: 1000,
        down: false,

        gravityFactor: 0,

        maxVel: {x:0, y:1000},
        speed: 100,
        runningSpeed: 250,

        animSheet: new ig.AnimationSheet('media/img/kitteh_58_64.png', 58, 64),
        
        update: function() {
            if (this.ai) {
                this.aiUpdate();
                this.parent();
                return;
            }
            if (ig.input.state('spacebar') && ig.game.energy > 0) {
                this.vel.y = (-1)*this.runningSpeed;
                this.currentAnim = this.anims.fast;
                ig.game.energy-=5;
            } 
            else
            if (!ig.input.state('spacebar')) {
                this.vel.y = (-1)*this.speed;
                this.currentAnim = this.anims.default;
                if (ig.game.energy < 1000) {
                    ig.game.energy+=5;
                } else {
                    ig.game.energy = 1000;
                }
            } else { 
                this.vel.y = (-1)*this.speed;
                this.currentAnim = this.anims.default;
            }
            this.parent();
        },

        aiUpdate: function() {
            this.speed = 90; 
            this.runningSpeed = 235;
            if (this.energy >= 1000) {
                this.run = true;
            }
            if (this.energy > 500 && this.run) {
                this.vel.y = (-1)*this.runningSpeed;
                this.energy-=5;
            } else {
                this.vel.y = (-1)*this.speed;
                this.energy+=5;
                this.run = false;
            }
        },

        draw: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            if (settings.choose == "true") {
                this.maxVel = {x:0,y:0};
            }
            this.parent(x,y,settings);
            this.addAnim('default',0.4,[0,1]);
            this.addAnim('fast',0.25,[0,1]);
        }

    })
});

