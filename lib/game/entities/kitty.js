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
            if (ig.input.state('spacebar')) {
                this.vel.y = (-1)*this.runningSpeed;
            } else {
                this.vel.y = (-1)*this.speed;
            }
            this.parent();
            this.handleCameraMovement();
        },

        handleCameraMovement: function() {
            if (this.pos.y < ig.system.height / 2) {
                ig.game.screen.y = this.pos.y - ig.system.height / 2;
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
            this.addAnim('default',1,[0]);
        }

    })
});

