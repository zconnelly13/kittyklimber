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

        gravityFactor: 0,

        maxVel: {x:0, y:1000},
        speed: 100,
        runningSpeed: 250,

        animSheet: new ig.AnimationSheet('media/img/kitteh_58_64.png', 58, 64),
        
        update: function() {
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

