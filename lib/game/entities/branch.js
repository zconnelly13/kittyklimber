ig.module(
    'game.entities.branch'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityBranch = ig.Entity.extend({
        size: {x:202, y:48},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 100,
        gravityFactor: 0,
        maxVel: {x:0, y:0},

        animSheet: new ig.AnimationSheet('media/img/branch_202_48.png', 202, 48),
        
        update: function() {
            this.checkBreak();
            this.parent();
        },

        checkBreak: function() {
            var kittys = ig.game.getEntitiesByType(EntityKitty);
            for (var i=0;i<kittys.length;i++) {
                var kitty = kittys[i];
                if (this.touches(kitty)) {
                    this.breakSelf(kitty);
                }
            }
        },

        breakSelf: function(kitty) {
            kitty.slow();
            this.kill();
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
