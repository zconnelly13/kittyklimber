ig.module(
    'game.entities.chooseYourKitty'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityChooseYourKitty = ig.Entity.extend({
        size: {x:200, y:60},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 100,
        gravityFactor: 0,
        maxVel: {x:0, y:0},

        animSheet: new ig.AnimationSheet('media/img/space_bar_700_200.png', 700, 200),
        
        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[0]);
        }

    })
});

