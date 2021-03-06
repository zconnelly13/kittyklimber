ig.module(
    'game.entities.treeTop'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityTreeTop = ig.Entity.extend({
        size: {x:960, y:330},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 0,
        gravityFactor: 0,
        maxVel: {x:0, y:0},

        touched: false,

        animSheet: new ig.AnimationSheet('media/img/tree_top_960_640.png', 960, 640),
        
        update: function() {
            this.checkFinish();
            this.parent();
        },

        checkFinish: function() {
            var kittys = ig.game.getEntitiesByType(EntityKitty);
            for (var i=0;i<kittys.length;i++) {
                var kitty = kittys[i];
                if (this.touches(kitty)) {
                    if (!this.touched) {
                        ig.game.finish(kitty);
                    }
                    this.touched = true;
                }
            }
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
