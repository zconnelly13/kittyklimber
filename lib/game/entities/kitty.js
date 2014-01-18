ig.module(
    'game.entities.kitty'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityKitty = ig.Entity.extend({
        size: {x:58, y:64},
        collides: ig.Entity.COLLIDES.ACTIVE,
        zIndex: 2,

        gravityFactor: 0,

        speed: 250,

        animSheet: new ig.AnimationSheet('media/img/kitteh_58_64.png', 58, 64),
        
        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[0]);
        },

    })
});

