ig.module(
    'game.entities.branch'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityBranch = ig.Entity.extend({
        size: {x:140, y:60},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 100,
        gravityFactor: 0,
        maxVel: {x:0, y:0},

        animSheet: new ig.AnimationSheet('media/img/branch_140_60.png', 140, 60),
        
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
            if (!kitty.ai) {
                ig.game.energy-=(1000-ig.game.energy)*0.14;
                if (ig.game.energy < 0) {
                    ig.game.energy = 0;
                }
            }
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
